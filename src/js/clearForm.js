export class ClearForm {

    constructor(form) {
        this.form = form;
        this.formReqFields = form.querySelectorAll("[data-req]");
        this.formErrorIndicator = Array.from(this.formReqFields).map(item => item.previousSibling);
    }

    clearForm = () => {
        this.formErrorIndicator.forEach(item => item.innerHTML = "");
        this.formReqFields.forEach(item => item.classList.remove("_error"));
        this.formErrorIndicator.forEach(item => item.classList.remove("_error"));
    }
}