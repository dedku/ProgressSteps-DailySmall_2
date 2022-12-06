import { DomObject } from "../main"

export function update(existingDomObject: DomObject) {
    removeOrAddActive(existingDomObject.circles, existingDomObject.currentActive)

    addStyleToActive(existingDomObject.progress, existingDomObject.circles)

    disableOrEnableButton(existingDomObject.currentActive, existingDomObject.prev, existingDomObject.next, existingDomObject.circles)
}

export function removeOrAddActive(circlesArray: NodeListOf<Element>, activeStep: number) {
    circlesArray.forEach((circle, idx) => {
        let currentActiveGreatedThanIndex = idx < activeStep
        if (currentActiveGreatedThanIndex) {
            circle.classList.add('container__progress__circle__active')
        }
        if (!currentActiveGreatedThanIndex) {
            circle.classList.remove('container__progress__circle__active')
        }
    })
}


export function addStyleToActive(progressElement: HTMLDivElement | null, circlesArray: NodeListOf<Element>) {
    const actives = document.querySelectorAll('.container__progress__circle__active')

    progressElement!.style.width = (actives.length - 1) / (circlesArray.length - 1) * 100 + '%'
}

export function disableOrEnableButton(activeStep: number, previousStep: HTMLButtonElement | null, nextStep: HTMLButtonElement | null, circlesArray: NodeListOf<Element>) {
    if (activeStep === 1) {
        previousStep?.setAttribute('disabled', '');
    }
    if (activeStep === circlesArray.length) {
        nextStep?.setAttribute('disabled', '');
    }
    if (activeStep !== circlesArray.length && activeStep !== 1) {
        previousStep?.removeAttribute('disabled');
        nextStep?.removeAttribute('disabled');
    }
}