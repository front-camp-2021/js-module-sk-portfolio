import FiltersList from '../filters-list/index.js';
import DoubleSlider from '../../module-5/double-slider/index.js';

export default class SideBar {
  element

  constructor(categoriesFilter = [], brandFilter = [], priceRange = [], ratingRange = []) {
    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;
    this.priceRange = priceRange;
    this.raitingRange = ratingRange
    this.brandFilterList = new FiltersList({
      title: 'Brand',
      list: this.brandFilter
    })
    this.categoriesFilterList = new FiltersList({
      title: 'Category',
      list: this.categoriesFilter
    })
    this.priceRangeSlider = new DoubleSlider({
      min: this.priceRange.min,
      max: this.priceRange.max
    })
    this.ratingRangeSlider = new DoubleSlider({
      min: this.raitingRange.min,
      max: this.raitingRange.max,
      precision: this.raitingRange.precision
    })
    this.render()
    this.getSubElements()
    this.filtersLists = this.addFiltersLists(this.brandFilterList, this.categoriesFilterList)
    this.rangeSliders = this.getRangeSliders(this.priceRangeSlider, this.ratingRangeSlider)
    this.rangeSlidersElements = this.getRangeSlidersElements(this.rangeSliders)

    this.update()
    this.addEvent()
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {

    this.remove();
    this.element = null;
    this.subElements = {};
  }

  clearFilters() {
    this.subElements.form.reset()
    this.rangeSliders.map(slider => slider.reset())
  }

  get template() {
    return `
  <aside class="sidebar products-list__sidebar"  data-element="body">
          <div class="sidebar__head">
            <h3>
              Filters
            </h3>
            <button class="btn btn--only-img btn--white-bg">
              <img src="img/icons/arrows-left.svg" alt="close">
            </button>
          </div>
          <div class="sidebar__range-sliders" data-element="slidersWrapper">

        </div>
      <form class="sidebar__form"  data-element="form">

          </form>
    <button class="btn btn--large-font btn--violet btn--full-width" data-element="button">
            CLEAR ALL FILTERS
          </button>
</aside>`
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
  getRangeSliders(...rangeSlidersArr) {
    return rangeSlidersArr
  }
  getRangeSlidersElements(rangeSlidersArr) {
    return rangeSlidersArr.map(slider => slider.element)
  }

  addFiltersLists(...filterListsArr) {
    return filterListsArr.map(list => {
      const block = document.createElement('div')
      block.innerHTML = `
                <h3>
                  <strong>
                      ${list.title}
                  </strong>
                </h3>
      `
      const filterListTitle = block.firstElementChild
      const fullFilterList = list.element.firstElementChild
      fullFilterList.prepend(filterListTitle)
      this.subElements.form.append(fullFilterList)
      return list
    })
  }

  update() {
    const filterElements = this.filtersLists.map(filter => filter.subElements.body);
    this.subElements.form.replaceChildren(...filterElements)
    this.subElements.slidersWrapper.replaceChildren(...this.rangeSlidersElements  )
  }

  addEvent() {
    this.element.addEventListener('click', this.clearFiltersClick)
  }

  clearFiltersClick = e => {
    console.log(e)
    if (e.target.className === this.subElements.button.className) {
      this.clearFilters()

      const customEvent = new CustomEvent('clear-filters', {bubbles: true})
      this.element.dispatchEvent(customEvent)
    }
  }
}
