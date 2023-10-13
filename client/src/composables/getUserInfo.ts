import type {Ref} from "vue";
import type {Octokit} from "@octokit/rest";
import {ref} from "vue";

async function getUserInfo(octokit: Octokit, error: Ref<string>) {


    const name = ref("")
    const username = ref("")
    const avatar = ref("")



    try {
        const response = await octokit.users.getAuthenticated();
        const user = response.data;

        username.value = user.login;
        name.value = user.name !== null ? user.name : user.login;
        avatar.value = user.avatar_url;

    } catch (e) {
        console.error(e);
        error.value = `${e}, please try gain!`;
    }
    return {name, username, avatar}
}

export default getUserInfo