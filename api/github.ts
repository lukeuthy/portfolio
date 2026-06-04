// Vercel serverless function — ported from the old Next.js route.
// Aggregates GitHub profile/repo/contribution data for github.com/lukeuthy.
// Cached at the edge for 1h; falls back to a zeroed payload on error so the
// client's deterministic static grid takes over cleanly.

export const config = { runtime: 'nodejs' }

const USERNAME = 'lukeuthy'

type ContribDay = { date: string; count: number; level: number }
type ContribResponse = { total: Record<string, number>; contributions: ContribDay[] }
type GithubRepo = { stargazers_count: number; forks_count: number }
type GithubUser = { public_repos: number; followers: number }

const EMPTY = {
  publicRepos: 0,
  followers: 0,
  totalStars: 0,
  totalForks: 0,
  totalContributions: 0,
  monthlyTotals: Array(12).fill(0),
  maxMonthly: 1,
  grid: null as number[][] | null,
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

export default async function handler(_request: Request): Promise<Response> {
  try {
    const headers: Record<string, string> = { 'User-Agent': 'jasper-portfolio/1.0' }
    const token = process.env.GITHUB_TOKEN
    if (token) headers.Authorization = `Bearer ${token}`

    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`),
    ])

    const [user, repos, contribData] = (await Promise.all([
      userRes.json(),
      reposRes.json(),
      contribRes.json(),
    ])) as [GithubUser, GithubRepo[], ContribResponse]

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : 0
    const totalForks = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)
      : 0

    const monthlyTotals = Array<number>(12).fill(0)
    if (Array.isArray(contribData?.contributions)) {
      for (const day of contribData.contributions) {
        monthlyTotals[new Date(day.date).getMonth()] += day.count
      }
    }
    const maxMonthly = Math.max(...monthlyTotals, 1)

    const grid: number[][] = []
    if (Array.isArray(contribData?.contributions)) {
      const days = [...contribData.contributions]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-364)
      for (let w = 0; w < 52; w++) {
        grid.push(days.slice(w * 7, w * 7 + 7).map((d) => d.level ?? 0))
        while (grid[w].length < 7) grid[w].push(0)
      }
    }

    return json({
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      totalStars,
      totalForks,
      totalContributions: contribData?.total?.lastYear ?? 0,
      monthlyTotals,
      maxMonthly,
      grid: grid.length === 52 ? grid : null,
    })
  } catch (e) {
    console.error('GitHub API error:', e)
    return json(EMPTY, 200)
  }
}
