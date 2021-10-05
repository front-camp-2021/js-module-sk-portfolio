export default class FiltersList {


  constructor({
                title = '',
                list = []
              } = {}) {
    this.title = title;
    this.list = list;

    this.render()
    this.getSubElements()
    this.getFilterItems()
    this.update()
    // this.getFilterItems()
    // ... your logic
  }

  get template() {
    return `<div class="sidebar__filter" data-element="body">
              <h3>
                <strong>
                  ${this.title}
                </strong>
              </h3>
            </div>`
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

  getFilterItems() {
    const items = this.list.map(item => `<label class="field field--checkbox sidebar__field" data-element="field">
              <input type="checkbox" ${item.checked === true ? `checked` : ''}>
                   <span class="field__checkbox-substitute">

                 </span>
                  <span class="field__info">
                  <span class="field__name">
                     ${item.title}
                 </span>
              </span>
            </label>`)

    return items.join('')
  }

  render() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    this.element = wrapper

  }

  getSubElements() {
    const result = {}
    const elements = this.element.querySelectorAll('[data-element]')
    for (const subElement of elements) {
      const name = subElement.dataset.element
      result[name] = subElement
    }
    this.subElements = result
  }

  reset() {
    this.list.map(item => delete (item.checked))
    this.update()
  }

  update() {
    const itemsWrapper = document.createElement('div')
    itemsWrapper.innerHTML = this.getFilterItems()
    this.subElements.body.replaceChildren(...itemsWrapper.children)
  }


}

// reset() {
//   this.list.map(item => delete (item.checked))
//   this.getFilterItems()
// }

// getFilterItems() {
//   const itemsWrapper = document.createElement('div')
//   const items = this.list.map(item => `<label class="field field--checkbox sidebar__field">
//               <input type="checkbox" ${item.checked === true ? `checked` : ''}>
//                   <span class="field__checkbox-substitute">
//
//                   </span>
//                   <span class="field__info">
//                   <span class="field__name">
//                       ${item.title}
//                   </span>
//               </span>
//             </label>`)
//   itemsWrapper.innerHTML = items.join('')
//   this.subElements.body.replaceChildren(...itemsWrapper.children)
//   return items
// }
