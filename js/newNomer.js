class NewNomer {
  constructor() {
    this.selectors = {
      link: '[data-js-page]',
      parentItem: '.filtr_body_grid_item',
      description: '.nomer_description',
      descriptionH: '.description_h',
      size: '.descriprion_size span',
      ploshad: '.descriprion_ploshad span',
      osnashenie: '[data-js-osnashenie]',
      price: '.description_price span',
    }
    this.initialization()
    this.bindEvent()
  }

  state = {
    heading: '',
    size: '',
    ploshad: '',
    osnashenie: '',
    price: '',
    img: '',
  }

  getDataHTML(event) {
    const mathces = event.target.closest(this.selectors.link)
    if (!mathces) { return }
    const objDatas = event.target.closest(this.selectors.parentItem)
    this.state.heading = objDatas.dataset.jsHeading
    this.state.size = objDatas.dataset.jsSize
    this.state.ploshad = objDatas.dataset.jsPloshad
    this.state.osnashenie = objDatas.dataset.jsOsnashenie
    this.state.price = objDatas.dataset.jsPrice
    this.state.img = event.target.src
    
    this.setLocalStorage()
  }

  setLocalStorage() {
    localStorage.setItem('pageCat', JSON.stringify(this.state))
  }

  // ==================================================новая страница ниже 

  initialization() {
    const isLoad = JSON.parse(localStorage.getItem('pageCat')) ?? null
    this.state = { ...isLoad ?? this.state }
    if (isLoad) {
      this.pasteHtml()
      this.clearLocalStorage()
    }
  }

  pasteHtml() {
    this.pasteHtmlInizialization()
    this.elementDescriptionH.textContent = this.state.heading
    this.elementDescriptionPrice.textContent = this.state.price
    this.elementDescriptionSice.textContent = this.state.size
    this.elementDescriptionPloshad.textContent = this.state.ploshad

    const arrayState = this.state.osnashenie.split(',')

    Array.from(this.elementDescriptionOsnashenie).forEach((element) => {
      const osnashenieElement = element.dataset.jsOsnashenie
      const isGut = arrayState.includes(osnashenieElement)
      element.classList.toggle('visually-hidden', !isGut)
    })
  }

  pasteHtmlInizialization() {
    this.elementDescriptionH = document.querySelector(this.selectors.descriptionH)
    this.elementDescriptionPrice = document.querySelector(this.selectors.price)
    this.elementDescriptionSice = document.querySelector(this.selectors.size)
    this.elementDescriptionPloshad = document.querySelector(this.selectors.ploshad)
    this.elementDescriptionOsnashenie = document.querySelectorAll(this.selectors.osnashenie)
  }

  clearLocalStorage() {
    localStorage.removeItem('pageCat')
  }

  bindEvent() {
    document.addEventListener('click', (event) => {
      this.getDataHTML(event)
    })
  }
}
new NewNomer()