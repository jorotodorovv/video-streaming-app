import axios from "axios";

//facade over axios, since fetch cannot be called server-side
async function fetch(url: string): Promise<any> {
    return await axios.get(url)
        .then((response) => response.data);
}

export {
    fetch
};