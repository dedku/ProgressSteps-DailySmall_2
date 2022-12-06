import './sass/style.scss'
import { update } from './ts/steps'

document.body.innerHTML = `
<div class="container">
      <div class="container__progress">
        <div class="container__progress__steps" id="progress"></div>
        <div class="container__progress__circle container__progress__circle__active">1</div>
        <div class="container__progress__circle">2</div>
        <div class="container__progress__circle">3</div>
        <div class="container__progress__circle">4</div>
      </div>

      <button class="container__btn" id="prev" disabled>Prev</button>
      <button class="container__btn" id="next">Next</button>
    </div>
`
// const progress = document.getElementById('progress') as HTMLDivElement | null;
// const prev = document.getElementById('prev') as HTMLButtonElement | null;
// const next = document.getElementById('next') as HTMLButtonElement | null;
// const circles: NodeListOf<Element> = document.querySelectorAll('.container__progress__circle')

export type DomObject = {
  progress: HTMLDivElement | null,
  prev: HTMLButtonElement | null,
  next: HTMLButtonElement | null,
  circles: NodeListOf<Element>,
  currentActive: number
}

const domObject: DomObject = {
  progress: document.getElementById('progress') as HTMLDivElement,
  prev: document.getElementById('prev') as HTMLButtonElement,
  next: document.getElementById('next') as HTMLButtonElement,
  circles: document.querySelectorAll('.container__progress__circle'),
  currentActive: 1
}

domObject.next!.addEventListener('click', () => {
  domObject.currentActive++

  if (domObject.currentActive > domObject.circles.length) {
    domObject.currentActive = domObject.circles.length
  }

  update(domObject)
})

domObject.prev!.addEventListener('click', () => {
  domObject.currentActive--

  if (domObject.currentActive < 1) {
    domObject.currentActive = 1
  }

  update(domObject)
})
