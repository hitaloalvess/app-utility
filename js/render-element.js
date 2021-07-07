import { createCoutdown } from "./coutdown.js"
import createEventListenerCalculadora from "./calculadora/event-listener-calculadora.js"
import { createCronometro } from "./cronometro.js"

export const renderElement = (document, typed) => {
    const content = document.querySelector(`main .content`)

    const elements = {
        calculadora() {
            return `<div class="container-calc">
            <section class="view-calc">
                <div class="calculos-realizados">50+50</div>
                <span class="resultado">
                    <p class="operacao-atual">+</p>
                    <p class="valor">100</p>
                </span>
            </section>
            <section class="botoes">
                <button data-funcionalidade='on'>On</button>
                <button data-funcionalidade="off" hidden>Off</button>
                <button data-funcionalidade="limpar">C</button>
                <button data-operacao="divisao">/</button>
                <button data-operacao="multiplicacao">X</button>
                <button data-number="7">7</button>
                <button data-number="8">8</button>
                <button data-number="9">9</button>
                <button data-operacao="substracao">-</button>
                <button data-number="4">4</button>
                <button data-number="5">5</button>
                <button data-number="6">6</button>
                <button data-operacao="soma">+</button>
                <button data-number="1">1</button>
                <button data-number="2">2</button>
                <button data-number="3">3</button>
                <button data-operacao="resultado">=</button>
                <button data-number=".">.</button>
                <button data-number="0">0</button>
                <button data-funcionalidade="apagar"><i class="fas fa-backspace"></i></button>
            </section>
        </div>`
        },
        cronometro() {
            return `<div class="container container-cron">
            <div class="timer">
                <p>00:00:00</p>
            </div>
            <div class="actions">
                <div class="stop btn-circle">
                    <i class="fas fa-stop"></i>
                </div>
                <div class="play btn-circle orange">
                    <i class="fas fa-play"></i>
                </div>
                <div class="pause btn-circle">
                    <i class="fas fa-pause"></i>
                </div>
            </div>
        </div>`
        },
        countdown() {
            return `<div class="container container-countdown">
            <div class="flip-clock flip-clock-h">
                <div class="digit">
                    <div class="card">
                        <div class="card-face card-face-front"></div>
                        <div class="card-face card-face-back"></div>
                    </div>

                    <div class="divider">
                        <div class="divider-line"></div>
                    </div>
                </div>
            </div>
            <div class="flip-clock flip-clock-m">
                <div class="digit">
                    <div class="card">
                        <div class="card-face card-face-front"></div>
                        <div class="card-face card-face-back"></div>
                    </div>
                    <div class="divider">
                        <div class="divider-line"></div>
                    </div>
                </div>
            </div>

            <div class="flip-clock flip-clock-s">
                <div class="digit">
                    <div class="card">
                        <div class="card-face card-face-front"></div>
                        <div class="card-face card-face-back"></div>
                    </div>
                    <div class="divider">
                        <div class="divider-line"></div>
                    </div>
                </div>
            </div>
        </div>`
        }
    }

    const features = {
        calculadora() {
            return createEventListenerCalculadora(document)
        },
        cronometro() {
            return createCronometro(document)
        },
        countdown() {
            return createCoutdown(document)
        }
    }

    const element = elements[typed]
    const startFeatures = features[typed]

    if (element && startFeatures) {
        content.innerHTML = element()
        startFeatures()
    }
}