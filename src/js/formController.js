export class FormController {

    constructor(formReqFields, formErrorIndicator, formValidate) {
        this.formValidate = formValidate;
        this.formReqFields = formReqFields;
        this.formErrorIndicator = formErrorIndicator;
    }

    _getInput = inputName => this.formReqFields.filter(item=>item.name === inputName)[0];

    _getErrorIndicator = inputName => this.formErrorIndicator.filter(item=>item.dataset.name === inputName)[0];

    _formAddError = (inputName, message) => {
        const input = this._getInput(inputName);
        const p = this._getErrorIndicator(inputName);
        p.innerText = message;
        p.classList.add("_error");
        input.classList.add("_error");
    }

    _formRemoveError = inputName => {
        const input = this._getInput(inputName);
        const p = this._getErrorIndicator(inputName);
        p.innerText = "";
        input.classList.remove("_error");
    }

    enableReqFields = () => this.formReqFields.forEach(item => item.removeAttribute("disabled"));
    disableReqFields = () => this.formReqFields.forEach(item => item.setAttribute("disabled","true"));

    isValidateError = () => {

        const error = this.formValidate.formValidate(this.formReqFields);

        if (error.name || error.email || error.message) {

            for (const [key, value] of Object.entries(error)) {
                if (key && value.length) {
                    this._formAddError(key, value);
                } else {
                    this._formRemoveError(key);
                }
            }

            return true

        } else {
            return false
        }

    };
}