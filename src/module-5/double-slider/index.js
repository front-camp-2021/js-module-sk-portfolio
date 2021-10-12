export default class DoubleSlider {
  element;
  subElements = {};

  thumbClicked = (event) => {
    if (event.target.className.includes('thumb')) {
      this.element.classList.add('range-slider_dragging');
      this.slider = event.target;
      this.progressLeft = this.subElements.progress.getBoundingClientRect().left;
      this.progressRight = this.subElements.progress.getBoundingClientRect().right;
      this.thumbLeft = this.subElements.thumbLeft.getBoundingClientRect().right;
      this.thumbRight= this.subElements.thumbRight.getBoundingClientRect().left;

      if (event.target === this.subElements.thumbLeft) {
        this.diffX = event.pageX - this.slider.getBoundingClientRect().right;
      } else {
        this.diffX = event.pageX - this.slider.getBoundingClientRect().left;
      }
      document.addEventListener('pointermove', this.thumbMove);
    }
  };

  thumbMove = (event) => {
    if (this.slider === this.subElements.thumbLeft) {
      let x = event.pageX - this.diffX;
      if (x < this.progressLeft) {
        x = this.progressLeft;
      } else if (x > this.thumbRight) {
        x = this.thumbRight;
      }
      this.selected.from = this.min + this.getValueInPercent(x - this.progressLeft) * (this.max - this.min) / 100;
    }
    if (this.slider === this.subElements.thumbRight) {
      let x = event.pageX - this.diffX;
      if (x < this.thumbLeft) {
        x = this.thumbLeft;
      } else if (posX > this.progressRight) {
        x = this.progressRight;
      }
      this.selected.to = this.max - this.getValueInPercent(this.progressRight - x) * (this.max - this.min) / 100;
    }
    this.update();
  }

  thumbUp = (event) => {
    this.element.classList.remove('range-slider_dragging');
    if (this.slider) {
      document.removeEventListener('pointermove', this.thumbMove);
      document.removeEventListener('pointerdown', this.thumbClicked);
    }

    const left = parseInt(this.subElements.progress.style.left.match(/\d+/));
    const right = parseInt(this.subElements.progress.style.right.match(/\d+/));
    const range = this.max - this.min;
    const from = this.min + left * range / 100;
    const to = this.max - right * range / 100;

    this.element.dispatchEvent(new CustomEvent('range-selected',
      {
        bubbles: true,
        detail: {
          filterName: this.filterName,
          value: { from, to }
        }
      })
    );
  };

  onDragStart = () => {
    return false;
  };

  constructor({
                min = 100,
                max = 200,
                formatValue = value => value,
                selected = {
                  from: min,
                  to: max
                },
                precision = 0,
                filterName = ''
              } = {}) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = selected;
    this.filterName = filterName;

    this.render();
    this.getSubElements();
    this.addEventListeners();
  }

  get template() {
    const leftPosition = (this.selected.from - this.min) * 100 / (this.max - this.min);
    const rightPosition = (this.max - this.selected.to) * 100 / (this.max - this.min);
    return `<div class="range-slider" data-element="rangeSlider">
        <span data-element="from">${this.formatValue(this.selected.from)}</span>
        <div class="range-slider__inner" data-element="progress">
          <span data-element="progress" class="range-slider__progress"
            style="left: ${leftPosition}%; right: ${rightPosition}%"></span>
          <span data-element="thumbLeft" class="range-slider__thumb-left"
            style="left: ${leftPosition}%"></span>
          <span data-element="thumbRight" class="range-slider__thumb-right"
            style="right: ${rightPosition}%"></span>
        </div>
        <span data-element="to">${this.formatValue(this.selected.to)}</span>
      </div >`
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  remove() {
    if (this.element) {
      this.removeEventListeners();
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }

  update() {
    const from = this.selected.from;
    const to = this.selected.to;
    const posFrom = from - this.min;
    const posTo = this.max - to;
    this.subElements.thumbLeft.style.left = `${posFrom}%`;
    this.subElements.progress.style.left = `${posFrom}%`;
    this.subElements.from.innerText = this.formatValue(from);
    this.subElements.thumbRight.style.right = `${posTo}%`;
    this.subElements.progress.style.right = `${posTo}%`;
    this.subElements.to.innerText = this.formatValue(to);
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    this.subElements = result;
  }

  getValueInPercent(value) {
    const sliderWidth = this.subElements.progress.getBoundingClientRect().width;
    return Math.floor(value * 100 / sliderWidth);
  }

  addEventListeners() {
    this.element.addEventListener('pointerdown', this.thumbClicked);
    document.addEventListener('pointerup', this.thumbUp);
    document.addEventListener('ondragstart', this.onDragStart);
  }

  removeEventListeners() {
    this.element.removeEventListener('pointerdown', this. thumbClicked);
    document.removeEventListener('pointerup', this. thumbUp);
    document.removeEventListener('ondragstart', this.onDragStart);
  }
}


