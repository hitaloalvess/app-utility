// import { createCoutdown } from "./coutdown.js"
import createCalculadora from "./calculadora.js"
import { createCronometro } from "./cronometro.js"
import createCoutdown from "./coutdown.js"

export const renderElement = (document, typed) => {
    const content = document.querySelector(`main .content`)

    const elements = {
        calculadora() {
            return `<div class="container-calc">
            <section class="view-calc">
                <span class="resultado">
                    <p class="operacao-atual"></p>
                    <div class="valor"></div>
                </span>
            </section>
            <section class="botoes">
                <button data-funcionalidade='on'>On</button>
                <button data-funcionalidade="off" class="disable">Off</button>
                <button data-funcionalidade="clean">C</button>
                <button data-operacao="divisao">/</button>
                <button data-operacao="multiplicacao">x</button>
                <button data-number="7">7</button>
                <button data-number="8">8</button>
                <button data-number="9">9</button>
                <button data-operacao="subtracao">-</button>
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
                <button data-funcionalidade="backspace"><i class="fas fa-backspace"></i></button>
            </section>
        </div>`
        },
        cronometro() {
            return `<div class="container container-cron">
            <div class="timer">
                <p>00:00:00</p>
            </div>
            <div class="actions">
                <div data-type="stop" class="cron-btn stop btn-circle">
                    <i class="fas fa-stop"></i>
                </div>
                <div data-type="play" class="cron-btn play btn-circle orange">
                    <i class="fas fa-play"></i>
                </div>
                <div data-type="pause" class="cron-btn pause btn-circle">
                    <i class="fas fa-pause"></i>
                </div>
            </div>
        </div>`
        },
        countdown() {
            return ` <div class="container container-countdown">
            <h3>Aqui irá conter um título</h3>
            <!--FLIP CLOCK-->
            <div class="flip-group">
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
            </div>

            <!-- ACTIONS -->
            <div class="actions">
                <div class="action">
                    <div data-type="adicionar" class="btn-circle"><i class="fas fa-plus"></i></div>
                    <p>Adicionar</p>
                </div>
                <div class="action disabled">
                    <div data-type="editar" class="btn-circle"><i class="fas fa-edit"></i></div>
                    <p>Editar</p>
                </div>
                <div class="action disabled">
                    <div data-type="stop" class="btn-circle"><i class="fas fa-stop"></i></div>
                    <p>Stop</p>
                </div>
                <div class="action disabled">
                    <div data-type="pause" class="btn-circle"><i class="fas fa-pause"></i></div>
                    <p>Pause</p>
                </div>
                <div class="action disabled">
                    <div data-type="play" class="btn-circle"><i class="fas fa-play"></i></div>
                    <p>Play</p>
                </div>
            </div>

            <div class="modal">
                <div class="container">
                    <div class="modal-header">
                        <h4>Editar o temporizador</h4>
                        <div data-modal-button="cancelar" class="close"><i class="fas fa-times"></i></div>
                    </div>
                    <div class="modal-content">
                        <form id="formulario">
                            <div class="row">
                                <div class="form-group">
                                    <label for="hours">Horas</label>

                                    <div class="button-group">
                                        <div class="button left"><i class="fas fa-chevron-left"></i></div>
                                        <input type="text" class="contador" id="hours" value="00">
                                        <div class="button right"><i class="fas fa-chevron-right"></i></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="minutes">Minutos</label>

                                    <div class="button-group">
                                        <div class="button left"><i class="fas fa-chevron-left"></i></div>
                                        <input type="text" class="contador" id="minutes" value="00">
                                        <div class="button right"><i class="fas fa-chevron-right"></i></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="seconds">Horas</label>

                                    <div class="button-group">
                                        <div class="button left"><i class="fas fa-chevron-left"></i></div>
                                        <input type="text" class="contador" id="seconds" value="00">
                                        <div class="button right"><i class="fas fa-chevron-right"></i></div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="form-group">
                                    <label for="som">Som</label>
                                    <select id="som">
                                        <option value="">Selecione</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="form-group">
                                    <label for="title">Título</label>
                                    <input type="text" id="title">
                                </div>
                            </div>

                            <div class="row">
                                <div class="form-group footer">
                                    <input data-modal-button="cancelar" type="button" value="Cancelar">
                                    <input data-modal-button="iniciar" type="submit" value="Iniciar">
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>`
        }
    }

    const features = {
        calculadora() {
            return createCalculadora(document)
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