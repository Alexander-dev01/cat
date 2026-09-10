class TitleCastom {
  constructor() {
    this.selectors = {
      osnashenie: '[data-js-osnashenie-img]',
      filtr: '.filtr_body_grid',
      titleCastom: '.title_castom',
    }
    this.initialization()
    this.bindEvent()
  }


  state = {
    text: '',
    elementHTML: null,
  }

  initialization() {
    this.elementFiltrParent = document.querySelector(this.selectors.filtr)
  }

  pointerover(event) {
    const matches = event.target.closest(this.selectors.osnashenie)
    if (!matches) { return }

    const valueOsnashenie = matches.dataset.jsOsnashenieImg
    this.state.text = valueOsnashenie
    this.state.elementHTML = matches

    console.log('навелся');

    this.titleAdd()
  }

  titleAdd() {
    this.deleteDiv()

    this.state.elementHTML.style.position = 'relative'

    const divCreate = document.createElement('div')
    divCreate.classList.add('title_castom')
    divCreate.textContent = this.state.text

    this.state.elementHTML.append(divCreate)


    setTimeout(() => {
      divCreate.classList.add('beauty')
    }, 100)

  }

  deleteDiv() {
    const da = this.state.elementHTML.querySelectorAll(this.selectors.titleCastom)
    if (!da) { return }
    Array.from(da).forEach((element) => {
      element.classList.remove('beauty')
      setTimeout(() => {
        element.remove()
      }, 300)
    })

  }

  bindEvent() {
    this.elementFiltrParent.addEventListener('pointerover', (event) => {
      this.pointerover(event)
    })
    this.elementFiltrParent.addEventListener('pointerout', (event) => {
      this.deleteDiv(event)
    })

  }
}
new TitleCastom()