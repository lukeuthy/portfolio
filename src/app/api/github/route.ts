export const revalidate = 3600; // re-fetch at most once per hour

type ContribDay = { date: string; count: number; level: number };
type ContribResponse = { total: Record<string, number>; contributions: ContribDay[] };
type GithubRepo = { stargazers_count: number; forks_count: number };
type GithubUser = { public_repos: number; followers: number };

export async function GET() {
  try {
    const headers = { "User-Agent": "jasper-portfolio/1.0" };

    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch("https://api.github.com/users/lukeuthy", { headers }),
      fetch("https://api.github.com/users/lukeuthy/repos?per_page=100&sort=updated", { headers }),
      fetch("https://github-contributions-api.jogruber.de/v4/lukeuthy?y=last"),
    ]);

    const [user, repos, contribData] = await Promise.all([
      userRes.json() as Promise<GithubUser>,
      reposRes.json() as Promise<GithubRepo[]>,
      contribRes.json() as Promise<ContribResponse>,
    ]);

    const totalStars = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
      : 0;
    const totalForks = Array.isArray(repos)
      ? repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)
      : 0;

    // Calculate monthly totals from contribution data
    const monthlyTotals = Array<number>(12).fill(0);
    if (Array.isArray(contribData?.contributions)) {
      for (const day of contribData.contributions) {
        const month = new Date(day.date).getMonth();
        monthlyTotals[month] += day.count;
      }
    }
    const maxMonthly = Math.max(...monthlyTotals, 1);

    // Build 52-week grid from the last 364 days of contribution data
    const grid: number[][] = [];
    if (Array.isArray(contribData?.contributions)) {
      const days = [...contribData.contributions]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-364);
      for (let w = 0; w < 52; w++) {
        grid.push(days.slice(w * 7, w * 7 + 7).map(d => d.level ?? 0));
        // pad last week if needed
        while (grid[w].length < 7) grid[w].push(0);
      }
    }

    return Response.json({
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      totalStars,
      totalForks,
      totalContributions: contribData?.total?.lastYear ?? 0,
      monthlyTotals,
      maxMonthly,
      grid: grid.length === 52 ? grid : null,
    });
  } catch (e) {
    console.error("GitHub API error:", e);
    return Response.json(
      { publicRepos: 0, followers: 0, totalStars: 0, totalForks: 0, totalContributions: 0, monthlyTotals: Array(12).fill(0), maxMonthly: 1, grid: null },
      { status: 200 }
    );
  }
}
