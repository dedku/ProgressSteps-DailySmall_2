import { describe, expect, it, vi } from 'vitest'
import { JSDOM } from 'jsdom'
import { DomObject } from '../main'
import { update, removeOrAddActive, addStyleToActive, disableOrEnableButton } from './steps'

const dom: JSDOM = (new JSDOM(`<!DOCTYPE html><body>
    <div class="container">
        <div class="container__progress">
            <div class="container__progress__steps" id="progress"></div>
                <div class="container__progress__circle container__progress__circle__active">1</div>
                <div class="container__progress__circle">2</div>
                <div class="container__progress__circle">3</div>
                <div class="container__progress__circle">4</div>
            </div>

        <button class="container__btn" id="prev">Prev</button>
        <button class="container__btn" id="next">Next</button>
    </div>
</body>`, { url: "http://localhost:5173/" }))

global.document = dom.window.document

describe(('Test update function'), () => {
    const domObject: DomObject = {
        progress: document.getElementById('progress') as HTMLDivElement,
        prev: document.getElementById('prev') as HTMLButtonElement,
        next: document.getElementById('next') as HTMLButtonElement,
        circles: document.querySelectorAll('.container__progress__circle'),
        currentActive: 1
    }
    it(('Update function is callable'), () => {
        const updateSpy = vi.fn(update)
        updateSpy(domObject)
        expect(updateSpy).toHaveBeenCalled()
    })
    it(('Active styles is removed or added'), () => {
        let domActivesArray: NodeListOf<Element> | null
        function domActiveUpdate() {
            domActivesArray = document.querySelectorAll('.container__progress__circle__active')
        }

        domActiveUpdate()
        expect(domActivesArray!.length).toBe(1)

        removeOrAddActive(domObject.circles, 3)
        domActiveUpdate()
        expect(domActivesArray!.length).toBe(3)

        removeOrAddActive(domObject.circles, 2)
        domActiveUpdate()
        expect(domActivesArray!.length).toBe(2)
    })
    it(('Style is added to active class'), () => {
        const progressZero = domObject.progress!.style.width
        expect(progressZero).toBe('0%')

        addStyleToActive(domObject.progress, domObject.circles)
        const progressNew = domObject.progress!.style.width
        expect(progressNew).toBe('33.33333333333333%')
    })
    it(('Buttons are disabled or enabled in right time'), () => {
        disableOrEnableButton(
            1, domObject.prev, domObject.next, domObject.circles)
        expect(domObject.prev!.disabled).toBeTruthy()
        expect(domObject.next!.disabled).toBeFalsy()

        disableOrEnableButton(
            2, domObject.prev, domObject.next, domObject.circles)
        expect(domObject.prev!.disabled).toBeFalsy()
        expect(domObject.next!.disabled).toBeFalsy()

        disableOrEnableButton(
            4, domObject.prev, domObject.next, domObject.circles)
        expect(domObject.next!.disabled).toBeTruthy()
    })

})