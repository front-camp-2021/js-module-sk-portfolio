// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

export default class Page {
  element;
  subElements = {};
  components = {};
  pageLimit = 10;
  totalPages = 100;
  filters = new URLSearchParams();

  constructor() {
    this.filters.set('_page', '1');
    this.filters.set('_limit', this.pageLimit);
    this.render()
    this.getSubElements()
    // ... your logic
  }

  get template () {
    return `
  <section class="products-list">
    <div class="container ">
      <div class="products-list__inner" data-element="mainWrapper">
        <div class="products products-list__main">
          <div class="products__search-res">
            <p>
              7,618 results found
            </p>
            <button class="btn btn--only-img btn--violet">
              <img src="img/icons/white-heart.svg" alt="heart">
            </button>
          </div>
      </div>
    </div>
  </section>`
  }

  getSubElements(){
    const result = {}
    const elements = this.element.querySelectorAll('[data-element]')

    for (const subElement of elements) {
      const name = subElement.dataset.element
      result[name] = subElement
    }
    this.subElements = result
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }



  remove () {
    // ... your logic
  }

  destroy () {
    // ... your logic
  }
}
