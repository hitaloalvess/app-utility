// export const createCoutdown = () => {

//     const elements = {
//         s: initElements('s'),
//         m: initElements('m'),
//         h: initElements('h')
//     }

//     function initElements(typed) {
//         const element = {}

//         if (!['s', 'm', 'h'].includes(typed)) return element

//         const target = document.querySelector(`.flip-clock-${typed}`)
//         if (!target) return element


//         element.digit = target.querySelector(`.digit`)
//         element.card = element.digit.querySelector(`.card`)
//         element.cardFaces = element.card.querySelectorAll(`.card-face`)
//         element.cardFacesFront = element.cardFaces[0]
//         element.cardFacesBack = element.cardFaces[1]

//         return element
//     }

//     (function run() {
//         const date = new Date
//         const now = {
//             s: date.getSeconds(),
//             m: date.getMinutes(),
//             h: date.getHours()
//         }

//         now.s = now.s <= 9 ? `0${now.s}` : `${now.s}`
//         now.m = now.m <= 9 ? `0${now.m}` : `${now.m}`
//         now.h = now.h <= 9 ? `0${now.h}` : `${now.h}`



//         for (const chave of Object.keys(elements)) {

//             const currentDate = now[chave]
//             let nextCurrentDate = parseInt(currentDate) + 1
//             nextCurrentDate = nextCurrentDate <= 9 ? `0${nextCurrentDate}` : `${nextCurrentDate}`

//             if (chave === 's' || chave === 'm') {
//                 nextCurrentDate = nextCurrentDate <= 59 ? `${nextCurrentDate}` : `00`
//             }
//             if (chave === 'h') {
//                 nextCurrentDate = nextCurrentDate <= 23 ? `${nextCurrentDate}` : `00`
//             }

//             const element = elements[chave]

//             if (element && element.digit) {
//                 if (!element.digit.dataset.digitBefore) {
//                     element.digit.dataset.digitBefore = currentDate
//                     element.cardFacesFront.textContent = element.digit.dataset.digitBefore
//                     element.digit.dataset.digitAfter = nextCurrentDate
//                     element.cardFacesBack.textContent = element.digit.dataset.digitAfter
//                 } else if (element.digit.dataset.digitBefore !== currentDate) {
//                     element.card.addEventListener('transitionend', () => {
//                         element.digit.dataset.digitBefore = currentDate
//                         element.cardFacesFront.textContent = element.digit.dataset.digitBefore

//                         const cardClone = element.card.cloneNode(true)
//                         cardClone.classList.remove('flipped')
//                         element.digit.replaceChild(cardClone, element.card)
//                         element.card = cardClone
//                         element.cardFaces = element.card.querySelectorAll('.card-face')
//                         element.cardFacesFront = element.cardFaces[0]
//                         element.cardFacesBack = element.cardFaces[1]

//                         element.digit.dataset.digitAfter = nextCurrentDate
//                         element.cardFacesBack.textContent = element.digit.dataset.digitAfter
//                     }, { once: true })
//                     if (!element.card.classList.contains('flipped')) {
//                         element.card.classList.add('flipped')
//                     }
//                 }
//             }
//         }

//         setTimeout(run, 1000)
//     })()
// }