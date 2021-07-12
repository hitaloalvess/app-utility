export const createCronometro = () => {

    const buttons = document.querySelectorAll(`.container-cron .actions .cron-btn`)
    const timerDisplay = document.querySelector(`.timer`)
    const btnPlay = document.querySelector(`[data-type="play"]`)
    const btnStop = document.querySelector(`[data-type="stop"]`)
    const btnPause = document.querySelector(`[data-type="pause"]`)

    const state = {
        s: 0,
        m: 0,
        h: 0
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    const buttonBehavior = {
        play() {
            if (state.tempo) return
            timerDisplay.classList.add('animando')
            timerDisplay.classList.remove('paused')
            const temporizador = setInterval(() => {
                state.s++
                    if (state.s > 59) {
                        state.m++
                            state.s = 0
                        if (state.m > 59) {
                            state.h++
                                state.m = 0
                        }
                    }

                const format = tempoFormat(state.s, state.m, state.h)
                timerDisplay.children[0].textContent = format
            }, 15)

            setState({ tempo: temporizador })

        },
        stop() {
            if (state.tempo) return
            state.s = 0
            state.m = 0
            state.h = 0

            timerDisplay.children[0].innerText = `00:00:00`
            timerDisplay.classList.remove('animando')
            timerDisplay.classList.remove('paused')
        },
        pause() {
            timerDisplay.classList.add('paused')
            clearInterval(state.tempo)
            delete state.tempo
        }
    }

    buttons.forEach(button => {
        const typeButton = button.dataset.type
        button.addEventListener('click', buttonBehavior[typeButton])
    })

    function tempoFormat(seconds, minutes, hours) {
        seconds = seconds <= 9 ? `0${seconds}` : seconds
        minutes = minutes <= 9 ? `0${minutes}` : minutes
        hours = hours <= 9 ? `0${hours}` : hours

        return `${hours}:${minutes}:${seconds}`
    }
}