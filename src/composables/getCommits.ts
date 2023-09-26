import axios from "axios";
import {ref, Ref} from "vue";


function getCommits(URI: string, commits: Ref<any[]>) {

    axios
        .get(`${URI}`)
        .then((response) => {
            commits.value = response.data;


        })
        .catch((error) => {
            console.error("Error: ", error)
        })


}

export default getCommits