class TitleCastom {
  constructor() {
    this.bindEvent()
  }

  selectors = {
    none: '[data-js-none]',
    gamingComplex: '[data-js-gamingComplex]',
  }

  state = {
    text: '',
    elementHTML: null,
    nameElement: '',
  }

  mouseenter(event) {
    const gamingElement = event.target.closest(this.selectors.gamingComplex)
    const noneElement = event.target.closest(this.selectors.none)
    if (!gamingElement && !noneElement) { return }

    if (gamingElement) {
      this.state.text = 'Игровой комплекс'
      this.state.nameElement = 'gaming'
    }
    if (noneElement) {
      this.state.text = 'Пустой номер'
      this.state.nameElement = 'none'
    }
    this.state.elementHTML = gamingElement ?? noneElement
    this.titleAdd()

  }

  titleAdd() {
    console.log('state', this.state);
    const isElementInArray = this.state.elementHTML.querySelector('.title_castom')


    if (isElementInArray) {
      isElementInArray.remove()
    }

    const divCreate = document.createElement('div')
    divCreate.classList.add('title_castom')
    divCreate.textContent = this.state.text

    this.state.elementHTML.append(divCreate)

    setTimeout(() => {
      divCreate.classList.add('beauty')
    }, 100)

  }

  mouseleave(event) {
    console.log('event.target', event.target);

    const isElementInArray = this.state.elementHTML.querySelectorAll('.title_castom')
    if (isElementInArray) {
      isElementInArray.forEach(element => {
        element.classList.remove('beauty')
        setTimeout(() => {
          element.remove()

        }, 300)
      });
    }
  }

  titleDelete() {

  }

  bindEvent() {
    const elementsGaming = document.querySelectorAll(`${this.selectors.gamingComplex}, ${this.selectors.none}`)
    elementsGaming.forEach((element) => {
      element.addEventListener('mouseenter', (event) => { this.mouseenter(event) })
      element.addEventListener('mouseleave', (event) => { this.mouseleave(event) })
    })

  }
}

new TitleCastom()