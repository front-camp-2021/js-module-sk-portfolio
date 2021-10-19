export default class Pagination {
  element;
  start = 0;
  pageIndex = 0;

  constructor({
                totalPages = 10,
                page = 1,
              } = {}) {
    this.totalPages = totalPages;
    this.pageIndex = page - 1;
    this.render()
    this.addEventListeners()
    this.getSubElements()
    this.items = this.getPaginationItems(this.totalPages)
    this.update(this.totalPages)


  }


  getPageItemTemplate() {
    return `<li class="pagination__item" ><button class="pagination__link"></button></li>`
  }

  get template() {
    return `<nav class="products-list__pagination pagination" data-element="wrapper">
        <button class="pagination__btn pagination__btn--left" data-element="prev">
          <img src="../../module-6/search/img/icons/arrow-left.svg" alt="prev">
        </button>
        <ul class="pagination__list"  data-element="list">

        </ul>
        <button class="pagination__btn pagination__btn--right"  data-element="next">
          <img src="../../module-6/search/img/icons/arrow-left.svg" alt="next">
        </button>
      </nav>`
  }

  getPaginationItems(totalPages) {
    const itemsArray = []
    for (let i = 0; i < totalPages; i++) {
      const block = document.createElement('div')
      block.innerHTML = this.getPageItemTemplate()
      itemsArray.push(block.firstElementChild)
    }
    return itemsArray
  }

  render() {
    if(!this.totalPages) {
      console.error('No pagination')
    } else {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = this.template
      this.element = wrapper.firstElementChild
    }
  }

  update(newTotal) {
    this.totalPages = newTotal
    this.removeEventListeners()
    this.addEventListeners()
    this.items = this.getPaginationItems(newTotal)
    this.subElements.list.replaceChildren(...this.setCurrentPage())
    if (this.element) {
      this.element.dispatchEvent(new CustomEvent('page-changed', {
        detail: {
          page: this.pageIndex
        }
      }));
    }
  }

  getSubElements() {
    const result = {}
    const elements = this.element.querySelectorAll('[data-element]')
    for (const element of elements) {
      const name = element.dataset.element
      result[name] = element
    }
    this.subElements = result
  }

  setCurrentPage() {
    this.element.dispatchEvent(new CustomEvent('page-changed', {
      detail: {
        page: this.pageIndex
      }
    }));
    return this.items.filter((item, index) => {
      if(index === this.pageIndex ) {
        item.classList.add('pagination__link--current')
        return item
      } else {
        item.classList.remove('pagination__link--current')
        return item
      }

    })
  }

  goToPrevPage = (e) => {
    if(e.target.closest('.pagination__btn--left') ) {
      if (this.pageIndex !== 0) {
        this.pageIndex--

      } else {
        this.pageIndex = 0
      }
      this.setCurrentPage()
    }
  }

  setCurrentOnClick = (e) => {
    this.items.map((item, index) => {
     e.target.closest('.pagination__item') === item ? this.pageIndex = index : null
    })
    this.setCurrentPage()

  }

  goToNextPage = (e) => {
    if(e.target.closest('.pagination__btn--right') ) {
      if (this.pageIndex !== this.totalPages - 1) {
        this.pageIndex++

      } else {
        this.pageIndex = this.totalPages - 1
      }
      this.setCurrentPage()
    }
  }


  addEventListeners(){
    this.element.addEventListener('click', this.setCurrentOnClick, true)
    this.element.addEventListener('click', this.goToNextPage, true)
    this.element.addEventListener('click', this.goToPrevPage, true)
  }
  removeEventListeners(){
    this.element.removeEventListener('click', this.setCurrentOnClick, true)
    this.element.removeEventListener('click', this.goToNextPage, true)
    this.element.removeEventListener('click', this.goToPrevPage, true)
  }
  remove() {
    if (this.element) {
      this.element.remove();
      this.removeEventListeners();
    }
  }

  destroy() {
      this.remove();
      this.element = null;
  }
}
