export class ClearForm {

    constructor(formReqFields, formErrorIndicator) {
        this.formReqFields = formReqFields;
        this.formErrorIndicator = formErrorIndicator;
    }

    clearForm = () => {
        this.formErrorIndicator.forEach(item => item.innerHTML = "");
        this.formReqFields.forEach(item => item.classList.remove("_error"));
        this.formErrorIndicator.forEach(item => item.classList.remove("_error"));
    }
}