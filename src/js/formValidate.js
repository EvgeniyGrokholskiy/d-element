export class FormValidate {
    constructor(form, popUpWindow, modalWindow, modalWindowController, popupWindowController, postFormData) {
        this.form = form;
        this.popUpWindow = popUpWindow
        this.modalWindow = modalWindow
        this.postFormData = postFormData
        this.modalWindowController = modalWindowController
        this.popupWindowController = popupWindowController
    }

    formAddError = (input, message) => {
        const p = input.previousSibling
        p.innerText = message
        p.classList.add("_error")
        input.classList.add("_error")
    }

    formRemoveError = (input) => {
        const p = input.previousSibling
        p.classList.remove("_error")
        p.innerText = ""
        input.classList.remove("_error")
    }

    emailValidate = (input) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(input.value)
    }

    clearForm = (formReqField) => {
        formReqField.forEach(item => item.value = "")
    }

    formValidate = (form) => {
        let error = 0;
        let formReqField = form.querySelectorAll("[data-req]");

        const formData = {
            name: formReqField[0]?.value,
            email: formReqField[1]?.value,
            message: formReqField[2].value
        };

        formReqField.forEach((item) => {
            if (!item.value.length) {
                this.formAddError(item, `${item.name} is require!`)
                error = 1
            } else {
                this.formRemoveError(item)
            }

            if (item.name === "email" && item.value) {
                if (!this.emailValidate(item)) {
                    this.formAddError(item, "Not valid email")
                    error = 1
                } else {
                    this.formRemoveError(item)
                }
            }
            if (item.name === "message" && item.value.length > 256) {
                if (!item.value.length < 256) {
                    this.formAddError(item, "Message must be short of 256 symbols")
                    error = 1
                } else {
                    this.formRemoveError(item)
                }
            }
        })
        if (error <= 0) {
            this.postFormData.POST(formData)
            this.modalWindowController.modalClose(this.modalWindow)
            this.clearForm(formReqField)
            this.modalWindowController.allClose()
            this.popupWindowController.popupOpen(this.popUpWindow)
            this.popupWindowController.popupWindowCloseTimeout(this.popUpWindow)
        }
    }

}