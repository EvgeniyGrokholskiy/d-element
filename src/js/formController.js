export class FormController {

    constructor(formValidate) {
        this.formValidate = formValidate;
    }

    formAddError = (form, inputName, message) => {
        const selectorName = `[name=${inputName}]`
        const input = form.querySelector(`${selectorName}`);
        const p = input.previousSibling;
        p.innerText = message;
        p.classList.add("_error");
        input.classList.add("_error");
    }

    formRemoveError = (form, inputName) => {
        const selectorName = `[name=${inputName}]`
        const input = form.querySelector(`${selectorName}`)
        const p = input.previousSibling;
        p.innerText = "";
        input.classList.remove("_error");
    }

    clearForm = (form) => {
        const formReqField = form.querySelectorAll("[data-req]")
        formReqField.forEach(item => item.value = "")
    };

    validate = (form) => {

        const error = this.formValidate.validate(form);

        if (error.name || error.email || error.message) {

            for (const [key, value] of Object.entries(error)) {
                if (key && value.length) {
                    this.formAddError(form, key, value);
                } else {
                    this.formRemoveError(form, key);
                }
            }

            return false

        } else {
            return true
        }

    };
}