import Card from '../../module-2/card/index.js';

export default class CardsList {
  constructor({data = [], Component = {}}) {
    this.data = data;
    this.Component = Component;
    // ... your logic
    this.render()
    this.update(this.data)
  }

  get template() {
    return `<div class="card-list" data-element="list"></div>`
  }

  render() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    this.element = wrapper.firstElementChild
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }

  update(data = []) {
    this.data = data
    const updateCards = data.map(item =>{
      return new this.Component(item).element
    })
    if(updateCards.length) {
      this.element.append(...updateCards)
    }
  }

}
