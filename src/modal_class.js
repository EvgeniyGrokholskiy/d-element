export class Modal {

    constructor(form, body, popUpWindow, overlayWindow, modalWindow, fetch_api) {
        this.form = form
        this.body = body
        this.popUpWindow = popUpWindow
        this.overlayWindow = overlayWindow
        this.modalWindow = modalWindow
        this.fetchApi = fetch_api
        this.modalOpen = this.modalOpen.bind(this)
        this.allClose = this.allClose.bind(this)
        this.modalClose = this.modalClose.bind(this)
        this.formAddError = this.formAddError.bind(this)
        this.formRemoveError = this.formRemoveError.bind(this)
        this.emailValidate = this.emailValidate.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.popupWindowCloseTimeout = this.popupWindowCloseTimeout.bind(this)
        this.popupOpen = this.popupOpen.bind(this)
        this.formValidate = this.formValidate.bind(this)
    }

    modalOpen() {
        this.overlayWindow.classList.add("overlay-open");
        this.modalWindow.classList.add("lets_talk_modal-open");
        this.body.setAttribute("style", "overflow:hidden; height:100vh;");
        this.overlayWindow.addEventListener("click", this.allClose);
        this.modalWindow.addEventListener("click", (e) => e.stopPropagation());
    }

    allClose() {
        this.overlayWindow.classList.remove("overlay-open");
        this.body.removeAttribute("style");
        this.modalWindow.classList.remove("lets_talk_modal-open");
        this.overlayWindow.removeEventListener("click", this.allClose);
        this.modalWindow.removeEventListener("click", (e) => e.stopPropagation());
    }

    modalClose(modalWindowNode) {
        modalWindowNode.classList.remove("lets_talk_modal-open");
    }

    formAddError(input, message) {
        const p = input.previousSibling
        p.innerText = message
        input.previousSibling.classList.add("_error")
        input.classList.add("_error")
    }

    formRemoveError(input) {
        input.previousSibling.classList.remove("_error")
        input.classList.remove("_error")
    }

    emailValidate(input) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(input.value)
    }

    clearForm(formReqField) {
        formReqField.forEach(item => item.value = "")
    }

    popupWindowCloseTimeout(popUpWindow) {
        setTimeout(() => {
            popUpWindow.classList.remove("popUp-open")
        }, 3000)
    }

    popupOpen(popupNode) {
        popupNode.classList.add("popUp-open")
    }

    formValidate(form) {
        let error = 0;
        let formReqField = form.querySelectorAll("._req");
        const formDate = {
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

            if (item.name === "email") {
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
            this.fetchApi.postData("http://localhost:8080", formDate)
            this.modalClose(this.modalWindow)
            this.clearForm(formReqField)
            this.allClose()
            this.popupOpen(this.popUpWindow)
            this.popupWindowCloseTimeout(this.popUpWindow)
        }
    }

}