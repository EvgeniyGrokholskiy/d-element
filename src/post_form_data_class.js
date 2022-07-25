export class PostFormData {

    constructor(form, fetchAPI) {
        this.dataFields = form.querySelectorAll("[data-req]");
        this.fetchAPI = fetchAPI;
    };

    POST = async (formData) => {
        try {
            this.dataFields.forEach(item => item.setAttribute("disable", "true"))
            const response = await this.fetchAPI.postData("http://localhost:8080", formData)
        } catch (error) {
            console.error(error)
        } finally {
            this.dataFields.forEach(item => item.removeAttribute("disable"))
        }
    };
}