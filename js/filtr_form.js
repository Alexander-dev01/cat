class FiltrForm {
  constructor() {
    this.selectors = {
      forma: '#form_filtr',
      filtrSquare: '.filtr_square',
      filtrEquipment: '.filtr_equipment',
      sbros: '[data-js-sbros-parametrow]',
    }
    this.initialization()
    this.bindEvent()
  }

  state = {
    minPrice: '',
    maxPrice: '',
    ploshad: [],
    osnashenie: [],
  }

  initialization() {
    this.elementFormFiltr = document.querySelector(this.selectors.forma)
    this.elementFiltrSquare = document.querySelector(this.selectors.filtrSquare)
    this.elementFiltrEquipment = document.querySelector(this.selectors.filtrEquipment)
    this.elementSbros = document.querySelector(this.selectors.sbros)
  }

  onSubmit(event) {
    const { target } = event
    this.getDataForm(target)
    console.log('state', this.state);

    new FiltrLogic(this.state)
  }

  getDataForm(target) {
    // сбор цены
    this.state.minPrice = Number(target.elements.minPrice.value)
    this.state.maxPrice = Number(target.elements.maxPrice.value)
    // сбор площади
    const ploshad = this.elementFiltrSquare.querySelectorAll('input')
    const ploshadNew = Array.from(ploshad)
      .filter((element) => element.checked)
      .map((element) => {
        return element.value
      })
    this.state.ploshad = ploshadNew

    // сбор оснащения
    const osnashenie = this.elementFiltrEquipment.querySelectorAll('input')
    const osnashenieNew = Array.from(osnashenie)
      .filter((element) => element.checked)
      .map((element) => {
        return element.value
      })
    this.state.osnashenie = osnashenieNew
  }

  sbrosChecked() {
    // сброс цены
    this.elementFormFiltr.elements.minPrice.value = null
    this.elementFormFiltr.elements.maxPrice.value = null
    this.state.minPrice = ''
    this.state.maxPrice = ''
    // сброс площади
    const ploshad = this.elementFiltrSquare.querySelectorAll('input')
    const ploshadNew = Array.from(ploshad)
    ploshadNew.forEach((element) => { element.checked = true })
    this.state.ploshad = []

    // сброс оснащения
    const osnashenie = this.elementFiltrEquipment.querySelectorAll('input')
    const osnashenieNew = Array.from(osnashenie)
    osnashenieNew.forEach((element) => { element.checked = true })

    this.state.osnashenie = []
    console.log('state сброс', this.state);
  }

  bindEvent() {
    this.elementFormFiltr.addEventListener('submit', (event) => {
      event.preventDefault()
      this.onSubmit(event)
    })
    this.elementSbros.addEventListener('click', () => {
      this.sbrosChecked()
    })
  }
}
new FiltrForm()



class FiltrLogic {
  constructor(statte) {
    this.selectors = {
      gridParent: '.filtr_body_grid',
    }
    this.state = { ...statte }
    this.initialization()
    this.magic()
  }

  initialization() {
    this.elementGridParent = document.querySelector(this.selectors.gridParent)
  }

  magic() {
    Array.from(this.elementGridParent.children).forEach((element) => {
      const objPPO = this.getDataInput(element)
      let srawnenieOk = true
      this.srawnenie(objPPO).forEach((znachenie) => {
        if (znachenie === false) {
          srawnenieOk = false
        }
      })
      element.classList.remove('visually-hidden')
      if (!srawnenieOk) {
        element.classList.add('visually-hidden')
      }

      console.log('srawnenieOk() на этом объекте', srawnenieOk);
    })

  }

  srawnenie(obj) {
    const objPrice = Number(obj.price)
    const minPrice = Number(this.state.minPrice)
    const maxPrice = Number(this.state.maxPrice)
    const priceOk = objPrice >= minPrice && objPrice <= maxPrice

    const ploshadOk = this.state.ploshad.includes(obj.ploshad)

    const objOsnashenieArray = obj.osnashenie.split(',')
    let osnashenieOk = true
    objOsnashenieArray.forEach(element => {
      const da = this.state.osnashenie.includes(element)
      if (!da) {
        osnashenieOk = false
      }
    })

    return [priceOk, ploshadOk, osnashenieOk]
  }

  getDataInput(element) {
    const price = element.dataset.jsPrice
    const ploshad = element.dataset.jsPloshad
    const osnashenie = element.dataset.jsOsnashenie
    return { price, ploshad, osnashenie }
  }
  
}


