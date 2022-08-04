export class PostFormData {

    constructor(fetchAPI) {
        this.fetchAPI = fetchAPI;
    };

    POST = (formData) => {
        const response = this.fetchAPI.postData(formData);
        return "ok";
    };
}