import './sass/style.scss'

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
const progress = document.getElementById('progress') as HTMLDivElement | null;
const prev = document.getElementById('prev') as HTMLButtonElement | null;
const next = document.getElementById('next') as HTMLButtonElement | null;
const circles: NodeListOf<Element> = document.querySelectorAll('.container__progress__circle')

let currentActive = 1

next!.addEventListener('click', () => {
  currentActive++

  if (currentActive > circles.length) {
    currentActive = circles.length
  }

  update(circles)
})

prev!.addEventListener('click', () => {
  currentActive--

  if (currentActive < 1) {
    currentActive = 1
  }

  update(circles)
})

//TODO ADD OBJECT INSTED OF ALL PARAMETS
function update(circleArray: NodeListOf<Element>) {
  circleArray.forEach((circle, idx) => {
    let currentActiveGreatedThanIndex = idx < currentActive
    if (currentActiveGreatedThanIndex) {
      circle.classList.add('container__progress__circle__active')
    }
    if (!currentActiveGreatedThanIndex) {
      circle.classList.remove('container__progress__circle__active')
    }
  })

  const actives = document.querySelectorAll('.container__progress__circle__active')

  progress!.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%'

  if (currentActive === 1) {
    prev?.setAttribute('disabled', '');
  }
  if (currentActive === circles.length) {
    next?.setAttribute('disabled', '');
  }
  if (currentActive !== circles.length) {
    prev?.removeAttribute('disabled');
    next?.removeAttribute('disabled');
  }
}