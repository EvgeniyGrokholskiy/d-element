export class PopupWindowController {
    constructor(popUpWindow) {
        this.popUpWindow = popUpWindow
    }

    popupOpen = () => {
        this.popUpWindow.classList.add("popUp-open");
    }

    popupWindowIsCloseByTimeout = () => {
        setTimeout(() => {
            this.popUpWindow.classList.remove("popUp-open");
        }, 3000)
    }
}