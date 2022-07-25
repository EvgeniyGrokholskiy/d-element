export class PopupWindowController {

    popupOpen = (popUpWindow) => {
        popUpWindow.classList.add("popUp-open");
    }

    popupWindowCloseTimeout = (popUpWindow) => {
        setTimeout(() => {
            popUpWindow.classList.remove("popUp-open");
        }, 3000)
    }
}