import Countdown from "./coutdown/coutdownModel.js";

export default function createCoutdown(document) {

    const coutdown = Countdown()

    document.querySelectorAll(`[data-type]`).forEach(button => {
        button.addEventListener('click', handleButton)
    });

    function handleButton(event) {
        const buttonType = event.target.dataset.type

        const functionality = coutdown.functionalitySelect(buttonType)

        if (functionality) {
            functionality()
        }

    }

}