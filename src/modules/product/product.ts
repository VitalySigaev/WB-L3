import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;
  

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();

    
    
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

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');
    
    
  }
}

// // Импортируем класс ViewTemplate из файла viewTemplate в директории utils
// import { ViewTemplate } from '../../utils/viewTemplate';

// // Импортируем класс View из файла view в директории utils
// import { View } from '../../utils/view';

// // Импортируем функцию formatPrice из файла helpers в директории utils
// import { formatPrice } from '../../utils/helpers'

// // Импортируем значение html из файла product.tpl.html в текущей директории
// import html from './product.tpl.html';

// // Импортируем тип ProductData из модуля 'types'
// import { ProductData } from 'types';

// // Определяем тип ProductComponentParams как объект с произвольными ключами и значениями
// type ProductComponentParams = { [key: string]: any };

// // Определяем класс Product
// export class Product {
//   // Объявляем поля класса
//   view: View; // Ссылка на объект класса View
//   product: ProductData; // Информация о продукте
//   params: ProductComponentParams; // Пользовательские параметры

//   // Конструктор класса Product
//   constructor(product: ProductData, params: ProductComponentParams = {}) {
//     // Присваиваем переданный продукт и пользовательские параметры полям класса
//     this.product = product;
//     this.params = params;

//     // Создаем объект ViewTemplate на основе импортированного шаблона html и клонируем его
//     this.view = new ViewTemplate(html).cloneView();
//   }

//   // Метод для присоединения компонента к DOM
//   attach($root: HTMLElement) {
//     // Добавляем корневой элемент view к указанному элементу в DOM
//     $root.appendChild(this.view.root);
//   }

//   // Метод для отображения информации о продукте
//   render() {
//     // Извлекаем необходимые свойства из информации о продукте
//     const { id, name, src, salePriceU } = this.product;

//     // Устанавливаем атрибут 'href' для корневого элемента view, создавая ссылку на продукт
//     this.view.root.setAttribute('href', `/product?id=${id}`);

//     // Устанавливаем источник изображения для элемента img внутри view
//     this.view.img.setAttribute('src', src);

//     // Устанавливаем текст заголовка элемента title внутри view
//     this.view.title.innerText = name;

//     // Устанавливаем текст цены элемента price внутри view, форматируя цену с помощью функции formatPrice
//     this.view.price.innerText = formatPrice(salePriceU);

//     // Если параметр isHorizontal равен true, добавляем класс 'is__horizontal' к корневому элементу view
//     if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');
//   }
// }
