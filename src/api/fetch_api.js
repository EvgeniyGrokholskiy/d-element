export const fetch_api = {
    postData(data) {
        return fetch("http://localhost:8080", {
            method: "POST",
            body: JSON.stringify(data)
        }).then(data => data)
    }
}