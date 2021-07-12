import Modal from "./modal.js"

export default function Countdown() {

    const inputTitle = document.querySelector(`.container-countdown h3`)
    const btnAdicionar = document.querySelector(`[data-type="adicionar"]`)
    const groupActions = document.querySelector(`.container-countdown .actions .group-actions`)

    const modal = Modal()
    modal.subscribe(fillCountdown)
    modal.subscribe(activeGroupActions)

    const state = {
        valueTemporizador: null
    }
    const elements = {
        s: initElements('s'),
        m: initElements('m'),
        h: initElements('h')
    }

    function initElements(typed) {
        const element = {}

        if (!['s', 'm', 'h'].includes(typed)) return element

        const target = document.querySelector(`.flip-clock-${typed}`)
        if (!target) return element


        element.digit = target.querySelector(`.digit`)
        element.card = element.digit.querySelector(`.card`)
        element.cardFaces = element.card.querySelectorAll(`.card-face`)
        element.cardFacesFront = element.cardFaces[0]
        element.cardFacesBack = element.cardFaces[1]

        return element
    }

    function functionalitySelect(type) {
        const functionalities = {
            adicionar() {
                modal.open()
            },
            play() {
                run()
            },
            pause() {
                clearInterval(state.valueTemporizador)
            },
            stop() {

            },
            editar() {
                modal.open()
            }
        }

        const functionalitie = functionalities[type]

        return functionalitie
    }

    function fillCountdown(command) {
        const time = {
            s: command.seconds,
            m: command.minutes,
            h: command.hours
        }

        inputTitle.textContent = command.title

        for (const chave of Object.keys(elements)) {

            const currentDate = time[chave]
            const nextCurrentDate = currentDate - 1
            const element = elements[chave]

            if (element && element.digit) {
                element.digit.dataset.digitBefore = timeFormat(currentDate)
                element.cardFacesFront.textContent = element.digit.dataset.digitBefore
                element.digit.dataset.digitAfter = timeFormat(nextCurrentDate)
                element.cardFacesBack.textContent = element.digit.dataset.digitAfter
            }
        }
    }

    function activeGroupActions(command) {
        btnAdicionar.classList.add('disabled')
        groupActions.classList.remove('disabled')
    }


    function run() {

        const currentDate = {
            s: elements.s.digit.dataset.digitBefore,
            m: elements.m.digit.dataset.digitBefore,
            h: elements.h.digit.dataset.digitBefore
        }

        const nextCurrentDate = {
            s: currentDate.s - 1,
            m: currentDate.m - 1,
            h: currentDate.h - 1
        }

        currentDate.s -= 1
        nextCurrentDate.s = nextCurrentDate.s <= 0 ? 59 : nextCurrentDate.s - 1

        if (currentDate.s < 0) {

            if (currentDate.m >= 0) {
                currentDate.m -= 1
                nextCurrentDate.m -= 1
            }
            currentDate.s = 59
            nextCurrentDate.s = currentDate.s - 1

            if (currentDate.m <= 0) {

                if (currentDate.h > 0) {
                    currentDate.h -= 1
                    nextCurrentDate.h -= 1
                    if (nextCurrentDate.h < 0) nextCurrentDate.h = 0
                }
            }
        }

        currentDate.s = timeFormat(currentDate.s)
        nextCurrentDate.s = timeFormat(nextCurrentDate.s)
        currentDate.m = timeFormat(currentDate.m)
        nextCurrentDate.m = timeFormat(nextCurrentDate.m)
        currentDate.h = timeFormat(currentDate.h)
        nextCurrentDate.h = timeFormat(nextCurrentDate.h)

        for (const chave of Object.keys(elements)) {
            if (elements[chave].digit.dataset.digitBefore !== currentDate[chave]) {

                elements[chave].card.addEventListener('transitionend', () => {
                    elements[chave].digit.dataset.digitBefore = currentDate[chave]
                    elements[chave].cardFacesFront.textContent = elements[chave].digit.dataset.digitBefore

                    const cardClone = elements[chave].card.cloneNode(true)
                    cardClone.classList.remove('flipped')
                    elements[chave].digit.replaceChild(cardClone, elements[chave].card)
                    elements[chave].card = cardClone
                    elements[chave].cardFaces = elements[chave].card.querySelectorAll('.card-face')
                    elements[chave].cardFacesFront = elements[chave].cardFaces[0]
                    elements[chave].cardFacesBack = elements[chave].cardFaces[1]

                    elements[chave].digit.dataset.digitAfter = nextCurrentDate[chave]
                    elements[chave].cardFacesBack.textContent = elements[chave].digit.dataset.digitAfter

                }, { once: true })
                if (!elements[chave].card.classList.contains('flipped')) {
                    elements[chave].card.classList.add('flipped')
                }
            }
        }

        if (currentDate.s <= 0 && currentDate.m <= 0 && currentDate.h <= 0) {
            clearTimeout(state.valueTemporizador)
            return
        } else {
            state.valueTemporizador = setTimeout(run, 1000)
        }
    }

    function timeFormat(time) {
        let lengthOfVariableTime = [...
            `${time}`
        ].length

        time = time <= 9 && lengthOfVariableTime === 1 ? `0${time}` : `${time}`
        return `${time}`
    }


    return {
        functionalitySelect
    }
}