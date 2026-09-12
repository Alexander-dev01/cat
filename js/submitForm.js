class SubmitForm {
  constructor() {
    this.selectors = {
      knopka: '.knopka',
      windowInput: '.window_input',
      window: '.window',
      krestik: '.krestik',
      windowSubmitOk: '.window_submit-ok',
    }
    this.initialization()
    this.bindEvent()
  }

  initialization() {
    this.elementWindowInput = document.querySelector(this.selectors.windowInput)
    this.elementWindow = document.querySelector(this.selectors.window)
    this.elementKrestik = document.querySelector(this.selectors.krestik)
    this.elementWindowSubmitOk = document.querySelector(this.selectors.windowSubmitOk)

  }

  showWindow(event) {
    const matches = event.target.closest(this.selectors.knopka)
    const textMatches = this.normalText(matches, 'забронировать')

    if (!matches || !textMatches) { return }
    this.elementWindowInput.classList.remove('visually-hidden')
  }
  showWindowOk(event) {
    const matches = event.target.closest(this.selectors.knopka)
    const textMatches = this.normalText(matches, 'отправить заявку')

    if (!matches || !textMatches) { return }
    this.elementWindow.classList.add('visually-hidden')
    this.elementWindowSubmitOk.classList.remove('visually-hidden')

  }

  normalText(element, text) {
    return element?.textContent.trim().toLowerCase() === text
  }

  hideWindow(event) {
    const matchesKrestik = event.target.closest(this.selectors.krestik)
    const matchesKnopka = event.target.closest(this.selectors.knopka)
    const matchesOk = this.normalText(matchesKnopka,'ок')

    if (!matchesKrestik && !matchesOk) { return }
    this.elementWindowInput.classList.add('visually-hidden')
    this.elementWindowSubmitOk.classList.add('visually-hidden')
    this.elementWindow.classList.remove('visually-hidden')
  }

  bindEvent() {
    document.addEventListener('click', (event) => {
      this.showWindow(event)
      this.showWindowOk(event)
      this.hideWindow(event)
    })
  }
}
new SubmitForm()