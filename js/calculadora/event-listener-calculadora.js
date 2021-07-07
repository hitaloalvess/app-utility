import createCalculadora from "./calculadora.js"

export default function createEventListenerCalculadora(document) {

    const functions = createCalculadora()
    const result = document.querySelector(`.view-calc .resultado .valor`)
    const btnNumbers = [...document.querySelectorAll(`[data-number]`)]
    const btnFuncionalitys = [...document.querySelectorAll(`[data-funcionalidade]`)]
    const btnOperations = [...document.querySelectorAll(`[data-operacao]`)]

    btnNumbers.forEach(button => {
        button.addEventListener('click', handleNumberButtons)
    })

    function handleNumberButtons(event) {
        const number = event.target.dataset.number
        const data = {
            number,
            input: result
        }
        functions.addNumber(data)
    }

    btnFuncionalitys.forEach(button => {
        button.addEventListener('click', handleFunctionalityButtons)
    })

    function handleFunctionalityButtons(event) {
        const funcionality = event.target.dataset.funcionalidade
    }

    btnOperations.forEach(button => {
        button.addEventListener('click', handleOperationsButtons)
    })

    function handleOperationsButtons(event) {
        const operationName = event.target.dataset.operacao

        const data = {
            operationName,
        }
        console.log(data)
        functions.stateOperationUpdate(data)
    }
}