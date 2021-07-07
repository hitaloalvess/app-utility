export default function createCalculadora(document) {

    const calculationsPerformed = document.querySelector(`.view-calc .calculos-realizados`)
    const currentOperation = document.querySelector(`.view-calc .resultado .operacao-atual`)
    const display = document.querySelector(`.view-calc .resultado .valor`)
    const btnNumbers = [...document.querySelectorAll(`[data-number]`)]
    const btnFuncionalitys = [...document.querySelectorAll(`[data-funcionalidade]`)]
    const btnOperations = [...document.querySelectorAll(`[data-operacao]`)]


    const storage = {
        onOff: 'on',
        num1: null,
        num2: null,
        operacao: null,
        enableNewNumber: true
    }

    function assignResult(result) {
        display.textContent = result
        storage.num1 = result
        storage.num2 = null
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

    function performCalculation() {
        if ((storage.num1 || storage.num1 === 0) && (storage.num2 || storage.num2 === 0)) {
            calculation()
        }
    }

    function storeNumber() {
        if (storage.onOff === 'off') return

        if (storage.enableNewNumber) return

        if (storage.num1 === null) {
            storage.num1 = display.textContent
        } else {
            storage.num2 = display.textContent
            performCalculation()
        }
    }


    btnNumbers.forEach(button => button.addEventListener('click', handleNumberButtons))

    function handleNumberButtons(event) {
        if (storage.onOff === 'off') return

        const number = event.target.dataset.number

        if (storage.enableNewNumber) {
            display.textContent = number
            storage.enableNewNumber = false
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
                storage.enableNewNumber = true

                calculationsPerformed.textContent = ''
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

        if (operationName !== 'resultado') {
            storage.operacao = operationName
        }

        addTypedNumberOperatio(display.textContent, event.target.innerHTML)
        storeNumber(display.textContent)
        currentOperation.textContent = event.target.innerHTML
        storage.enableNewNumber = true
    }

    function addTypedNumberOperatio(number, operation) {
        operation = operation === '=' ? '' : operation
        calculationsPerformed.textContent += `${number} ${operation} `
    }
}