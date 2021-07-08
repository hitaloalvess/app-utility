export default function createCalculadora(document) {

    const currentOperation = document.querySelector(`.view-calc .resultado .operacao-atual`)
    const display = document.querySelector(`.view-calc .resultado .valor`)
    const btnNumbers = [...document.querySelectorAll(`[data-number]`)]
    const btnFuncionalitys = [...document.querySelectorAll(`[data-funcionalidade]`)]
    const btnOperations = [...document.querySelectorAll(`[data-operacao]`)]


    const storage = {
        onOff: 'off',
        num1: null,
        num2: null,
        operacao: null,
        enableNewNumber: true
    }

    btnNumbers.forEach(button => button.addEventListener('click', handleNumberButtons))

    function handleNumberButtons(event) {
        if (storage.onOff === 'off') return

        const number = event.target.dataset.number

        if (storage.enableNewNumber) {
            display.textContent = number
            updateEnableNewNumber(false)
        } else {
            display.textContent += number
        }

    }



    btnFuncionalitys.forEach(button => {
        button.addEventListener('click', handleFunctionalityButtons)
    })

    function handleFunctionalityButtons(event) {
        const funcionality = event.target.dataset.funcionalidade

        const functionalities = {
            clean(valueInput = '0') {
                if (storage.onOff === 'off') return

                storage.num1 = null
                storage.num2 = null
                storage.operacao = null
                updateEnableNewNumber(true)

                currentOperation.textContent = ''
                display.textContent = valueInput
            },
            backspace() {
                if (storage.onOff === 'off') return

                const displayResult = [...display.textContent]
                displayResult.pop()

                if (displayResult.length > 0) {
                    display.textContent = displayResult.join('')
                } else {
                    const clean = functionalities['clean']
                    clean()
                }
            },
            on() {
                const btnOff = document.querySelector(`[data-funcionalidade="off"]`)
                const btnOn = event.target
                const clean = functionalities['clean']

                console.log('Ligando...')
                btnOn.classList.toggle('disable')
                btnOff.classList.toggle('disable')

                storage.onOff = 'on'
                clean()

            },
            off() {
                const btnOn = document.querySelector(`[data-funcionalidade="on"]`)
                const btnOff = event.target
                const clean = functionalities['clean']

                console.log('Desligando...')
                btnOff.classList.toggle('disable')
                btnOn.classList.toggle('disable')

                clean(' ')
                storage.onOff = 'off'
            }
        }

        const functionalitieTyped = functionalities[funcionality]

        if (functionalitieTyped) {
            functionalitieTyped()
        }
    }



    btnOperations.forEach(button => {
        button.addEventListener('click', handleOperationsButtons)
    })

    function handleOperationsButtons(event) {
        if (storage.onOff === 'off') return

        const operationName = event.target.dataset.operacao
        const simbolOperation = event.target.innerHTML
        const numberTyped = display.textContent

        storeOperation(operationName)
        addCurrentOperation(simbolOperation)
        storeNumber(numberTyped)
        updateEnableNewNumber(true)
    }

    function addCurrentOperation(operation) {
        currentOperation.textContent = operation
    }

    function storeOperation(name) {
        if (name == 'resultado') return
        if (storage.operacao) return

        storage.operacao = name
    }

    function storeNumber() {
        if (storage.onOff === 'off') return

        if (storage.enableNewNumber) return

        if (storage.num1 === null) {
            storage.num1 = display.textContent
        } else {
            storage.num2 = display.textContent
            calculation()
        }
    }

    function calculation() {
        const operations = {
            soma(num1, num2) {
                return parseInt(num1) + parseInt(num2)
            },
            subtracao(num1, num2) {
                return parseInt(num1) - parseInt(num2)
            },
            multiplicacao(num1, num2) {
                return parseInt(num1) * parseInt(num2)
            },
            divisao(num1, num2) {
                return parseInt(num1) / parseInt(num2)
            }
        }

        const operation = operations[storage.operacao]
        const result = operation(storage.num1, storage.num2)

        assignResult(result)
    }

    function assignResult(result) {
        display.textContent = result
        currentOperation.textContent = '='
        storage.num1 = result
        storage.num2 = null
        storage.operacao = null
    }

    function updateEnableNewNumber(bool) {
        storage.enableNewNumber = bool
    }
}