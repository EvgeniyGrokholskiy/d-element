export class PostFormData {

    constructor(form, fetchAPI) {
        this.dataFields = form.querySelectorAll("[data-req]");
        this.fetchAPI = fetchAPI;
        this.formData = {
            name: this.dataFields[0],
            email: this.dataFields[1],
            message: this.dataFields[2]
        }
    };

    POST = async () => {
        try {
            this.dataFields.forEach(item => item.setAttribute("disable", "true"));
            const response = await this.fetchAPI.postData("http://localhost:8080", this.formData);
            return "ok"
        } catch (error) {
            console.error(error)
            return  error
        } finally {
            this.dataFields.forEach(item => item.removeAttribute("disable"));
        }
    };
}