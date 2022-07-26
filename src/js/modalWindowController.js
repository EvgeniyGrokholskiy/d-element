export class ModalWindowController {

    constructor(body, overlayWindow, modalWindow, clearForm) {
        this.body = body;
        this.clearForm = clearForm;
        this.modalWindow = modalWindow;
        this.overlayWindow = overlayWindow;
    }

    modalOpen = () => {
        this.body.classList.add("body_scroll-off");
        this.overlayWindow.classList.add("overlay-open");
        this.modalWindow.classList.add("lets_talk_modal-open");
        this.overlayWindow.addEventListener("click", this.allClose);
        this.modalWindow.addEventListener("click", (e) => e.stopPropagation());
    }

    allClose = () => {
        this.clearForm.clearForm();
        this.body.classList.remove("body_scroll-off");
        this.overlayWindow.classList.remove("overlay-open");
        this.overlayWindow.removeEventListener("click", this.allClose);
        this.modalWindow.classList.remove("lets_talk_modal-open");
        this.modalWindow.removeEventListener("click", (e) => e.stopPropagation());
    }

}