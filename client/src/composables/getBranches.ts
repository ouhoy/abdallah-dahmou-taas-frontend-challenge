import type { Octokit } from "@octokit/rest";

async function getBranches(octokit: Octokit, repository: string, owner: string) {
  try {
    const response = await octokit.repos.listBranches({
      owner: owner,
      repo: repository,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getBranches;
