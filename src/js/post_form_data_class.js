export class PostFormData {

    constructor(fetchAPI) {
        this.fetchAPI = fetchAPI;
    };

    POST = async (formData) => {
        try {
            //this.dataFields.forEach(item => item.setAttribute("disable", "true"));
            const response = await this.fetchAPI.postData(formData);
            return "ok";
        } catch (error) {
            console.error(error)
            return  error;
        } finally {
            //this.dataFields.forEach(item => item.removeAttribute("disable"));
        }
    };
}