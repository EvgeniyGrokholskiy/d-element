import {Modal} from "./modal_class";
import {PostFormData} from "./post_form_data_class";
import {fetch_api} from "./api/fetch_api";

document.addEventListener("DOMContentLoaded", function (event) {

    const form = document.querySelector(".form");
    const body = document.querySelector("body");
    const popUpWindow = document.querySelector(".popUp");
    const overlayWindow = document.querySelector(".overlay");
    const modalWindow = document.querySelector(".lets_talk_modal");
    const letsTalkButton = document.querySelector(".lets_talk_block__button");
    const modalWindowCloseButton = document.querySelector(".lets_talk_modal__close_button");

    const postFormData = new PostFormData(form, fetch_api);
    const modal = new Modal(form, body, popUpWindow, overlayWindow, modalWindow, postFormData);

    letsTalkButton.addEventListener("click", modal.modalOpen);
    modalWindowCloseButton.addEventListener("click", modal.allClose);

    form.addEventListener("submit", async (e) => {
            e.preventDefault();
            modal.formValidate(form);
        }
    );

});
