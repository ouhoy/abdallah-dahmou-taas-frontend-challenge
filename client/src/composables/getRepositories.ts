import {ref} from "vue";
import type {Octokit} from "@octokit/rest";



async function getRepositories(octokitInstance: Octokit, error: any) {

    const repositories = ref([] as any[]);


    try {
        const {data} = await octokitInstance.repos.listForAuthenticatedUser();
        repositories.value = data;
    } catch (e) {
        window.history.pushState(null, "", "/");
        console.error(`Error: ${(e as Error).message}`);
        error.value = `${(e as Error).message}. Please try again!`;
    }


    return {repositories}

}

export default getRepositories