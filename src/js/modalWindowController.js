export class ModalWindowController {

    constructor(body, overlayWindow, modalWindow) {
        this.body = body;
        this.overlayWindow = overlayWindow;
        this.modalWindow = modalWindow
    }

    modalOpen = () => {
        this.body.classList.add("body_scroll-off");
        this.overlayWindow.classList.add("overlay-open");
        this.modalWindow.classList.add("lets_talk_modal-open");
        this.overlayWindow.addEventListener("click", this.allClose);
        this.modalWindow.addEventListener("click", (e) => e.stopPropagation());
    }

    allClose = () => {
        this.body.classList.remove("body_scroll-off");
        this.overlayWindow.classList.remove("overlay-open");
        this.overlayWindow.removeEventListener("click", this.allClose);
        this.modalWindow.classList.remove("lets_talk_modal-open");
        this.modalWindow.removeEventListener("click", (e) => e.stopPropagation());
    }

    modalClose = (modalWindowNode) => {
        modalWindowNode.classList.remove("lets_talk_modal-open");
    }

}