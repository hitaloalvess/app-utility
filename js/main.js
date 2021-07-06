import { renderElement } from "./render-element.js"

const itensMenu = [...document.querySelectorAll(`.menu .menu-item img`)]

itensMenu.forEach(itemMenu => {
    itemMenu.addEventListener('click', handleClick)
        // console.log(itemMenu.dataset.type)
})

function handleClick(event) {
    const buttonType = event.target.dataset.type
    renderElement(document, buttonType)
}