import type {Ref} from "vue";
import type {Octokit} from "@octokit/rest";
import {ref} from "vue";

interface UserInfo {
    username: string;
    name: string;
    avatar: string;
}


async function getUserInfo(octokit: Octokit) {

    const userInfo: Ref<UserInfo> = ref({
        username: "",
        name: "",
        avatar: "",
    });

    try {
        const response = await octokit.users.getAuthenticated();
        const user = response.data;

        userInfo.value.username = user.login;
        userInfo.value.name = user.name !== null ? user.name : user.login;
        userInfo.value.avatar = user.avatar_url;

    } catch (e) {
        console.error(e);
    }
    return {userInfo}
}

export default getUserInfo