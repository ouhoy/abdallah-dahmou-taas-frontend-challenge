import type {Octokit} from "@octokit/rest";

async function getCommits(octokit: Octokit, repository: string, owner: string, branch: string = "") {
    try {
        const response = await octokit.repos.listCommits({
            owner: owner,
            repo: repository,
            sha: branch,

        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default getCommits;
