import {debounce} from './debounce.js';

export default class Search {
  constructor() {
    this.render()
    this.getSubElements()
    this.dispatchEvent()
  }

  get template() {
    return `<form class="products__search search">
      <input type="text" placeholder="Search" data-element="input">
        <button data-element="submit">
          <img src="img/icons/search.svg" alt="search">
        </button>
    </form>`
  }

  getSubElements() {
    const res = {}
    const elements = this.element.querySelectorAll('[data-element]')
    for (const element of elements) {
      const name = element.dataset.element
      res[name] = element
    }
    this.subElements = res
  }

  render() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    this.element = wrapper.firstElementChild
  }

  dispatchEvent() {
    this.element.addEventListener('input', debounce(e => {
        const inputValue = e.target.value

        this.element.dispatchEvent(
          new CustomEvent('search-filter', {
            detail: inputValue
          }))
      }, 500)
    )
  }
  remove(){
    if(this.element){
      this.element.remove()
    }
  }
  destroy(){
    this.remove()
    this.element = null
  }
}
