export default function Modal() {

    const modalBody = document.querySelector(`.container-countdown .modal`)
    const cancelButton = document.querySelectorAll(`[data-modal-button="cancelar"]`)
    const form = document.getElementById('formulario')

    const state = {
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }


    function open() {
        modalBody.classList.add('active')
    }

    function close() {
        modalBody.classList.remove('active')
    }

    function valueInputConvertNumber(id) {
        return parseInt(document.getElementById(id).value)
    }

    function valueInputSelected(id) {
        const select = document.getElementById(id)
        return select.options[select.selectedIndex].value
    }

    function valueInputText(id) {
        return document.getElementById(id).value
    }




    form.addEventListener('submit', executeSubmit)

    function executeSubmit(event) {
        event.preventDefault()

        const h = valueInputConvertNumber('hours')
        const m = valueInputConvertNumber('minutes')
        const s = valueInputConvertNumber('seconds')
        const title = valueInputText('title')

        const command = {
            s,
            m,
            h,
            title
        }

        notifyAll(command)
        close()
    }


    cancelButton.forEach(button => {
        button.addEventListener('click', close)
    })

    return {
        open,
        close,
        subscribe
    }
}