export class FormValidate {

    emailValidate = (value) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
    }

    notEmptyField = (value) => !!value;

    formValidate = (form) => {

        let formReqField = form.querySelectorAll("[data-req]");

        const formError = {
            name: "",
            email: "",
            message: ""
        };

        formReqField.forEach((item) => {
            if (!this.notEmptyField(item.value)) {
                formError[item.name] = `${item.name} is require!`
            }

            if (item.name === "email" && item.value) {
                if (!this.emailValidate(item.value)) {
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