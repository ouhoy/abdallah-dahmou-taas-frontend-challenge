async function getAccessToken(codeParam: string) {

    try {
        const response = await fetch(`http://localhost:4000/getAccessToken?code=${codeParam}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data.access_token;

        }

    } catch (error) {
        console.error(`There is an error fetching the data: ${error}`)
    }


}

export default getAccessToken