export class FormValidate {
    constructor(form) {
        this.form = form;
    }

    emailValidate = (input) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(input.value);
    }

    formValidate = () => {

        let formReqField = this.form.querySelectorAll("[data-req]");

        const formError = {
            name: "",
            email: "",
            message: ""
        };

        formReqField.forEach((item) => {
            if (!item.value.length) {
                formError[item.name] = `${item.name} is require!`
            }

            if (item.name === "email" && item.value) {
                if (!this.emailValidate(item)) {
                    formError.email = "Not valid email"
                }
            }
            if (item.name === "message" && item.value.length > 256) {
                if (!item.value.length < 256) {
                    formError.message = "Message must be short of 256 symbols"
                }
            }

        })
        return formError
    }

}