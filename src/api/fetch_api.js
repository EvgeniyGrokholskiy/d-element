export const fetch_api = {
    postData(url, data) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        }).then(data => data)
    }
}