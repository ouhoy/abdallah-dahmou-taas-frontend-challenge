// Get token

import {ref} from "vue";

async function getAccessToken(codeParam: string, error: any) {
    const accessToken = ref("");


    try {
        const URI = `http://localhost:4000/getAccessToken?code=${codeParam}`;
        const response = await fetch(URI, {method: "GET"});

        if (response.ok) {

            const data = await response.json();
            accessToken.value = data.access_token;

        } else {
            window.history.pushState(null, "", "/");
            error.value = `Something went wrong. Please try again!`;
        }

    } catch (e) {
        window.history.pushState(null, "", "/");

        error.value = `${e}. Please try again!`;

    }

    return {accessToken, error}
}

export default getAccessToken;