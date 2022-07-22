document.addEventListener("DOMContentLoaded", function (event) {

    const form = document.querySelector(".form");
    const body = document.querySelector("body");
    const popUpWindow = document.querySelector(".popUp");
    const overlayWindow = document.querySelector(".overlay");
    const modalWindow = document.querySelector(".lets_talk_modal");
    const letsTalkButton = document.querySelector(".lets_talk_block__button");
    const modalWindowCloseButton = document.querySelector(".lets_talk_modal__close_button");


    function modalOpen() {
        overlayWindow.classList.add("overlay-open");
        modalWindow.classList.add("lets_talk_modal-open");
        body.setAttribute("style", "overflow:hidden; height:100vh;");
        overlayWindow.addEventListener("click", allClose);
        modalWindow.addEventListener("click", (e) => e.stopPropagation());
    }

    function allClose() {
        overlayWindow.classList.remove("overlay-open");
        body.removeAttribute("style");
        modalWindow.classList.remove("lets_talk_modal-open");
        overlayWindow.removeEventListener("click", allClose);
        modalWindow.removeEventListener("click", (e) => e.stopPropagation());
    }

    function modalClose(modalWindowNode) {
        modalWindowNode.classList.remove("lets_talk_modal-open");
    }

    form.addEventListener("submit", async (e) => {
            e.preventDefault()

            formValidate(form);

            function formValidate(form) {
                let error = 0;
                let formReqField = form.querySelectorAll("._req");
                const formDate = {
                    name: formReqField[0]?.value,
                    email: formReqField[1]?.value,
                    message: formReqField[2].value
                };
                formReqField.forEach((item) => {
                    if (!item.value.length) {
                        formAddError(item, `${item.name} is require!`)
                        error = 1
                    } else {
                        formRemoveError(item)
                    }

                    if (item.name === "email") {
                        if (!emailValidate(item)) {
                            formAddError(item, "Not valid email")
                            error = 1
                        } else {
                            formRemoveError(item)
                        }
                    }
                    if (item.name === "message" && item.value.length > 256) {
                        if (!item.value.length < 256) {
                            formAddError(item, "Message must be short of 256 symbols")
                            error = 1
                        } else {
                            formRemoveError(item)
                        }
                    }
                })
                if (error <= 0) {
                    postData("http://localhost:8080", formDate)
                    modalClose(modalWindow)
                    clearForm(formReqField)
                    allClose()
                    popupOpen(popUpWindow)
                    popupWindowCloseTimeout(popUpWindow)
                }
            }

            function formAddError(input, message) {
                const p = input.previousSibling
                p.innerText = message
                input.previousSibling.classList.add("_error")
                input.classList.add("_error")
            }

            function formRemoveError(input) {
                input.previousSibling.classList.remove("_error")
                input.classList.remove("_error")
            }

            function emailValidate(input) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(input.value)
            }

            function clearForm(formReqField) {
                formReqField.forEach(item => item.value = "")
            }

            function popupWindowCloseTimeout(popUpWindow) {
                setTimeout(() => {
                    popUpWindow.classList.remove("popUp-open")
                }, 3000)
            }

            function popupOpen(popupNode) {
                popupNode.classList.add("popUp-open")
            }

            function postData(url, data) {
                fetch(url, {
                    method: "POST",
                    body: JSON.stringify(data)
                }).then(data => data)
            }
        }
    );


    letsTalkButton.addEventListener("click", modalOpen);
    modalWindowCloseButton.addEventListener("click", allClose);
});
