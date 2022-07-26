import {fetch_api} from "../api/fetch_api";
import {FormValidate} from "./formValidate";
import {FormController} from "./formController";
import {PostFormData} from "./post_form_data_class";
import {PopupWindowController} from "./popupWindowController";
import {ModalWindowController} from "./modalWindowController";

document.addEventListener("DOMContentLoaded", function () {

    const body = document.querySelector("body");
    const form = document.querySelector(".form");
    const popUpWindow = document.querySelector(".popUp");
    const overlayWindow = document.querySelector(".overlay");
    const modalWindow = document.querySelector(".lets_talk_modal");
    const letsTalkButton = document.querySelector(".lets_talk_block__button");
    const modalWindowCloseButton = document.querySelector(".lets_talk_modal__close_button");

    const formExternalValidate = new FormValidate(form);
    const postFormData = new PostFormData(form, fetch_api);
    const popupWindowController = new PopupWindowController(popUpWindow);
    const formController = new FormController(form, formExternalValidate);
    const modalWindowController = new ModalWindowController(body, overlayWindow, modalWindow);

    letsTalkButton.addEventListener("click", modalWindowController.modalOpen);

    modalWindowCloseButton.addEventListener("click", modalWindowController.allClose);

    form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const isError = formController.isValidateError(form);
            if (!isError) {
                const status = await postFormData.POST()
                if (status === "ok") {
                    modalWindowController.modalClose();
                    formController.clearForm();
                    modalWindowController.allClose();
                    popupWindowController.popupOpen();
                    popupWindowController.popupWindowCloseTimeout();
                }
            }
        }
    );

});
