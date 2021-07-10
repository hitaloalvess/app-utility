export default function Modal() {

    const modalBody = document.querySelector(`.container-countdown .modal`)
    const cancelButton = document.querySelectorAll(`[data-modal-button="cancelar"]`)


    function open() {
        modalBody.classList.add('active')
    }

    function close() {
        modalBody.classList.remove('active')
    }




    cancelButton.forEach(button => {
        button.addEventListener('click', handleCancel)
    })

    function handleCancel(event) {
        close()
    }



    return {
        open,
        close
    }
}