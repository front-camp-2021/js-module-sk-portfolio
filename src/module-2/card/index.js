export default class Card {
  element;

  constructor({
                id = '',
                images = [0],
                title = '',
                rating = 0,
                price = 0,
                category = '',
                brand = ''
              } = {}) {
    this.id = id;
    this.images = images;
    this.title = title;
    this.rating = rating;
    this.price = price;
    this.category = category;
    this.brand = brand;

    this.render();
  }

  getTemplate() {
    return ` <div class="product-card__main">

    <div class="product-card__img">
      <img src="${this.images[0]}" alt="product">
    </div>
    <div class="product-card__info">
      <div class="product-card__wr">
        <div class="product-card__rating">
                              <span>
                                  ${this.rating}
                              </span>
                              <span>
                               ${this.category}
                              </span>
                              <span>
                              ${this.brand}
                              </span>
          <img src="img/icons/star.svg" alt="rating-star">
        </div>
        <div class="product-card__price">
          $${this.price}
        </div>
      </div>
      <div class="product-card__description">
        <h3>
          ${this.title}
        </h3>
        <p>
          Redesigned from scratch and completely revised.
        </p>
      </div>
    </div>
  </div>
  <div class="product-card__btns">
    <button class="product-card__btn btn">
      <img src="img/icons/heart.svg" alt="heart">
        <span>WISHLIST</span>
    </button>
    <button class="product-card__btn btn btn--violet">
      <img src="img/icons/bag.svg" alt="heart">
        <span>ADD TO CART</span>
    </button>
  </div>`
  }

  render() {
    const product = document.createElement('article');
    product.classList.add('product-card')

    if (this.rating !== null) {
      isNaN(Number(this.rating)) ? console.error('invalid rating value') : product.classList.add('product-card--with-rating')
    }
    product.innerHTML = this.getTemplate()

    this.element = product;
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }

  destroy() {
    this.remove()
    this.element = null
  }

}

