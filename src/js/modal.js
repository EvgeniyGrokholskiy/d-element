import {fetch_api} from "../api/fetch_api";
import {FormValidate} from "./formValidate";
import {PostFormData} from "./post_form_data_class";
import {PopupWindowController} from "./popupWindowController";
import {ModalWindowController} from "./modalWindowController";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".form");
    const body = document.querySelector("body");
    const popUpWindow = document.querySelector(".popUp");
    const overlayWindow = document.querySelector(".overlay");
    const modalWindow = document.querySelector(".lets_talk_modal");
    const letsTalkButton = document.querySelector(".lets_talk_block__button");
    const modalWindowCloseButton = document.querySelector(".lets_talk_modal__close_button");

    const postFormData = new PostFormData(form, fetch_api);
    const popupWindowController = new PopupWindowController();
    const modalWindowController = new ModalWindowController(body, overlayWindow, modalWindow);
    const formExternalValidate = new FormValidate(form,popUpWindow,modalWindow,modalWindowController,popupWindowController,postFormData);

    letsTalkButton.addEventListener("click", modalWindowController.modalOpen);

    modalWindowCloseButton.addEventListener("click", modalWindowController.allClose);

    form.addEventListener("submit", async (event) => {
            event.preventDefault();
            formExternalValidate.formValidate(form);
        }
    );

});
