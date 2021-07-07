export default function createCalculadora(document) {


    const state = {
        onOff: 'on',
        num1: null,
        num2: null,
        operacao: null,
        enableNewNumber: true
    }

    function addNumber(data) {
        if (state.onOff === 'off') return

        const valueNumber = data.number
        const input = data.input

        if (state.enableNewNumber) {
            input.innerHTML = valueNumber
            updateStateNewNumber({ enableNewNumber: false })
        } else {
            input.innerHTML += valueNumber
        }
    }

    function stateOperationUpdate(data) {
        if (state.onOff == 'off') return

        if (data.nameOperation != 'resultado') {
            state.operacao = data.nameOperation
        }
    }

    function updateStateNewNumber(data) {
        if (state.onOff == 'off') return

        state.enableNewNumber = data.enableNewNumber
    }

    return {
        addNumber,
        stateOperationUpdate
    }
}