import {ref} from "vue";

import type {Octokit} from "@octokit/rest";


async function getRepositories(octokitInstance: Octokit) {

    const repositories = ref([] as any[])


    try {
        const {data} = await octokitInstance.repos.listForAuthenticatedUser();
        repositories.value = data;
    } catch (e) {
        window.history.pushState(null, "", "/");
        console.error(`Error: ${(e as Error).message}`);
    }


    return {repositories}

}

export default getRepositories