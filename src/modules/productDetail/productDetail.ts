import { favoritesService } from '../../services/favorites.service';
import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';


class ProductDetail extends Component {
  more: ProductList;
  product?: ProductData;
  button = document.querySelector('.favorites');
  constructor(props: any) {
    super(props);

    this.more = new ProductList();
    this.more.attach(this.view.more);
  }

  async render() {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));

    const productResp = await fetch(`/api/getProduct?id=${productId}`);
    this.product = await productResp.json();

    if (!this.product) return;
    const { id, src, name, description, salePriceU } = this.product;

    this.view.photo.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.description.innerText = description;
    this.view.price.innerText = formatPrice(salePriceU);
    this.view.btnBuy.onclick = this._addToCart.bind(this);
    this.view.btnFavorite.onclick = this._addToFavorites.bind(this);
    const showButtonFavorite = () => {
      this.button?.classList.remove('hide');
      removeEventListener('click', showButtonFavorite);
    }
    this.view.btnFavorite.addEventListener('click', showButtonFavorite);


    const isInCart = await cartService.isInCart(this.product);
    const isInFavorites = await favoritesService.isInFavourites(this.product);

    if (isInFavorites) this._setInFavorites();

    if (isInCart) this._setInCart();

    fetch(`/api/getProductSecretKey?id=${id}`)
      .then((res) => res.json())
      .then((secretKey) => {
        this.view.secretKey.setAttribute('content', secretKey);
      });

    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.more.update(products);
      });
  }
  private _addToFavorites() {
    if (!this.product) return;

    favoritesService.addToFavorites(this.product);
    this._setInFavorites();
  }


  private async _setInFavorites() {
    if (!this.product) return;
    this.view.btnFavorite.innerText = 'В избранном';
    this.view.btnFavorite.disabled = true;
  }
  private _addToCart() {
    if (!this.product) return;

    cartService.addProduct(this.product);
    this._setInCart();
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;

  }
}


export const productDetailComp = new ProductDetail(html);




