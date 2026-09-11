class SubmitForm {
  constructor() {
    this.selectors = {
      knopka: '.knopka',
      windowInput: '.window_input',
      krestik: '.krestik',
    }
    this.initialization()
    this.bindEvent()
  }

  state = {
  }

  initialization() {
    this.elementWindowInput = document.querySelector(this.selectors.windowInput)
    this.elementKrestik = document.querySelector(this.selectors.krestik)

  }

  showWindow(event) {
    const matches = event.target.closest(this.selectors.knopka)
    const textMatches = matches?.textContent.trim().toLowerCase() === 'забронировать'

    if (!matches || !textMatches) { return }
    this.elementWindowInput.classList.remove('visually-hidden')
  }

  hideWindow(event) {
    const matches = event.target.closest(this.selectors.krestik)
    if (!matches) { return }
    this.elementWindowInput.classList.add('visually-hidden')
  }

  bindEvent() {
    document.addEventListener('click', (event) => {
      this.showWindow(event)
      this.hideWindow(event)
    })
  }
}
new SubmitForm()