export class FormController {

    constructor(form,formValidate) {
        this.form = form;
        this.formValidate = formValidate;
        this.formReqField = form.querySelectorAll("[data-req]")
    }

    formAddError = (inputName, message) => {
        const selector = `[name=${inputName}]`
        const input = this.form.querySelector(`${selector}`);
        const p = input.previousSibling;
        p.innerText = message;
        p.classList.add("_error");
        input.classList.add("_error");
    }

    formRemoveError = (inputName) => {
        const selector = `[name=${inputName}]`
        const input = this.form.querySelector(`${selector}`)
        const p = input.previousSibling;
        p.innerText = "";
        input.classList.remove("_error");
    }

    clearForm = () => {
        this.formReqField.forEach(item => item.value = "")
    };

    isValidateError = () => {

        const error = this.formValidate.formValidate(this.form);

        if (error.name || error.email || error.message) {

            for (const [key, value] of Object.entries(error)) {
                if (key && value.length) {
                    this.formAddError(key, value);
                } else {
                    this.formRemoveError(key);
                }
            }

            return true

        } else {
            return false
        }

    };
}