import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import { sendEvent } from '../../services/analytic.service';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;
  observer: IntersectionObserver;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();

    const cardElement = this.view.root;
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (Object.keys(this.product.log).length === 0) ? sendEvent('viewCard',  this.product ) : 
          sendEvent('viewCardPromo', this.product );
          console.log('Товар виден во вьюпорте');

          this.observer.disconnect();
        }
      });
    });

    this.observer.observe(cardElement);
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {

    
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal')
  }
}