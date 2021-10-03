import Card from '../../module-2/card/index.js';

export default class CardsList {
  constructor({data = [], Component = {}}) {
    this.data = data;
    this.Component = Component;
    // ... your logic
    this.render()
    this.getSubElements()
    this.update(this.data)
  }

  get template() {
    return `<div>
                <div class="card-list" data-element="body"></div>
            </div>`
  }

  render() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    this.element = wrapper.firstElementChild
  }
  getSubElements(){
    const result = {}
    const elements = this.element.querySelectorAll('[data-element]')

    for(const subElement of elements){
      const name = subElement.dataset.element
      result[name] = subElement
    }
    this.subElements = result
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

    const cards = data.map(item => {
      return new this.Component(item).element
    })
    if(cards.length) {
        this.subElements.body.replaceChildren(...cards)
    }
  }

}
