export const fetch_api = {
    postData(url, data) {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(data => data)
    }
}