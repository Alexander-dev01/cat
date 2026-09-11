class PageSelect {
  constructor() {
    this.selectors = {
      nomerInner: '.nomer-inner',
      imageItem: '.image-item',
      imageIndex: '[data-js-imageIndex]',
    }
    this.initialization()
    this.bindEvent()
    this.loadImgLocalStorage()
  }

  state = {
    srcImageMini: '',
  }

  initialization() {
    this.elementNomerInner = document.querySelector(this.selectors.nomerInner)
    this.elementsImagesMini = this.elementNomerInner.querySelectorAll(this.selectors.imageItem)
    this.elementImageIndex = this.elementNomerInner.querySelector(this.selectors.imageIndex)

  }

  loadImgLocalStorage() {
    this.state.srcImageMini =
      JSON.parse(localStorage.getItem('pageCat'))?.img
      ?? 'images/filtr/content/3.jpg'
    this.changeImages()

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
    this.elementImageIndex.src = this.state.srcImageMini
  }

  bindEvent() {
    this.elementNomerInner.addEventListener('click', (event) => {
      this.getDataImages(event)
    })

  }
}

new PageSelect()