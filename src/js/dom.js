export class Dom {

    constructor() {
        this._body = document.querySelector("body");
        this._form = document.querySelector(".form");
        this._formReqFieldNodes = this._form.querySelectorAll("[data-req]");
        this._formErrorIndicatorNodes = this._form.querySelectorAll("[data-name]");
        this._popUpWindow = document.querySelector(".popUp");
        this._overlayWindow = document.querySelector(".overlay");
        this._modalWindow = document.querySelector(".lets_talk_modal");
        this._modalWindowOpenButton = document.querySelector(".lets_talk_block__button");
        this._modalWindowCloseButton = document.querySelector(".lets_talk_modal__close_button");
    }

    getBody = () => this._body;
    getForm = () => document.querySelector(".form");
    getFormReqFieldArray = () => Array.from(this._formReqFieldNodes);
    getFormErrorIndicatorArray = () => Array.from(this._formErrorIndicatorNodes);
    getFormData = () => {

        const form = this.getForm();
        const formReqFieldNodes = form.querySelectorAll("[data-req]");

        const formData = {
            name: formReqFieldNodes[0].value,
            email: formReqFieldNodes[1].value,
            message: formReqFieldNodes[2].value
        }

        return formData
    };
    getOverlayWindow = () => this._overlayWindow;
    getModalWindow = () => this._modalWindow;
    getPopupWindow = () => this._popUpWindow;
    getModalWindowOpenButton = () => this._modalWindowOpenButton;
    getModalWindowCloseButton = () => this._modalWindowCloseButton;
}