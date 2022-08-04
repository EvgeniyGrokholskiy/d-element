import {Dom} from "./dom";
import {ClearForm} from "./clearForm";
import {fetch_api} from "../api/fetch_api";
import {FormValidate} from "./formValidate";
import {FormController} from "./formController";
import {PostFormData} from "./post_form_data_class";
import {PopupWindowController} from "./popupWindowController";
import {ModalWindowController} from "./modalWindowController";

document.addEventListener("DOMContentLoaded", function () {

    const dom = new Dom();

    const formExternalValidate = new FormValidate();
    const postFormData = new PostFormData(fetch_api);
    const popupWindowController = new PopupWindowController(dom.getPopupWindow());
    const clearForm = new ClearForm(dom.getFormReqFieldArray(),dom.getFormErrorIndicatorArray());
    const formController = new FormController(dom.getFormReqFieldArray(), dom.getFormErrorIndicatorArray(), formExternalValidate);
    const modalWindowController = new ModalWindowController(dom.getBody(), dom.getOverlayWindow(), dom.getModalWindow(), clearForm);

    dom.getModalWindowOpenButton().addEventListener("click", modalWindowController.modalOpen);

    dom.getModalWindowCloseButton().addEventListener("click", modalWindowController.allClose);

    dom.getForm().addEventListener("submit", async (event) => {
            event.preventDefault();

            const isError = formController.isValidateError(dom.getForm());
            if (!isError) {

                try {
                    formController.disableReqFields()
                    const status = await postFormData.POST(dom.getFormData());
                    if (status/* === "ok"*/) {
                        dom.getForm().reset();
                    clearForm.clearForm();
                    modalWindowController.allClose();
                    popupWindowController.popupOpen();
                    popupWindowController.popupWindowIsCloseByTimeout();
                }
                } catch (e) {
                    console.log(e)
                }
                finally {
                    formController.enableReqFields()
                }

            }
        }
    );

});
