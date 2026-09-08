class PageSelect {
  constructor() {
    this.selectors = {
      nomerInner: '.nomer-inner',
      imageItem: '.image-item',
      imageIndex:'[data-js-imageIndex]',
    }
    this.initialization()
    this.bindEvent()
  }

  state = {
    srcImageMini: '',
  }

  initialization() {
    this.elementNomerInner = document.querySelector(this.selectors.nomerInner)
    this.elementsImagesMini = document.querySelectorAll(this.selectors.imageItem)
  }

  getDataImages(event) {
    const { target } = event
    if (!target.closest(this.selectors.imageItem)) { return }

    this.state.srcImageMini = target.src
    this.changeImagesMini()
    this.changeImages()

  }
  changeImagesMini() {
    const arrayImagesmini = Array.from(this.elementsImagesMini)
    arrayImagesmini.forEach((element) => {
      const sowpalSrc = element.src === this.state.srcImageMini
      element.classList.toggle('image-item-active', sowpalSrc)
    })
  }

  changeImages() {
    const elementImageIndex=this.elementNomerInner.querySelector(this.selectors.imageIndex)
    elementImageIndex.src=this.state.srcImageMini
  }

  bindEvent() {
    this.elementNomerInner.addEventListener('click', (event) => { this.getDataImages(event) })

  }
}

new PageSelect()