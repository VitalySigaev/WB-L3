import { catalogComp } from './modules/catalog/catalog';
import { notFoundComp } from './modules/notFound/notFound';
import { homepageComp } from './modules/homepage/homepage';
import { productDetailComp } from './modules/productDetail/productDetail';
import { checkoutComp } from './modules/checkout/checkout';
import { favoritesCheckoutComp } from './modules/favorites/favoritesCheckout';


const ROUTES = {
  '/': homepageComp,
  '/catalog': catalogComp,
  '/product': productDetailComp,
  '/checkout': checkoutComp,
  '/favorites': favoritesCheckoutComp,
};

export default class Router {
  $appRoot: HTMLElement;

  constructor() {
    // @ts-ignore
    this.$appRoot = document.querySelector('.js__root');

    window.addEventListener('load', this.route.bind(this));
    window.addEventListener('hashchange', this.route.bind(this));
  }

  route(e: any) {
    e.preventDefault();

    // @ts-ignore
    const component = ROUTES[window.location.pathname] || notFoundComp;

    component.attach(this.$appRoot);
    component.render();
  }
}


// // import { catalogComp } from './modules/catalog/catalog';
// import { notFoundComp } from './modules/notFound/notFound';
// import { homepageComp } from './modules/homepage/homepage';
// import { productDetailComp } from './modules/productDetail/productDetail';
// import { checkoutComp } from './modules/checkout/checkout';
// import { favoritesCheckoutComp } from './modules/favorites/favoritesCheckout';

// const ROUTES = {
//   '/': homepageComp,
//   '/catalog': catalogComp,
//   '/product': productDetailComp,
//   '/checkout': checkoutComp,
//   '/favorites': favoritesCheckoutComp,
// };

// // Функция для отправки события
// function sendEvent(type, payload) {
//   const timestamp = new Date().getTime();
//   const event = {
//     type,
//     payload,
//     timestamp,
//   };

//   const eventData = JSON.stringify(event);

//   console.log('Отправка события:', eventData);

//   return fetch('/api/sendEvent', {
//     method: 'POST',
//     body: eventData,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => {
//       if (response.status === 200) {
//         console.log('Событие успешно отправлено');
//       } else {
//         console.error('Ошибка при отправке события');
//       }
//     })
//     .catch((error) => {
//       console.error('Ошибка при отправке события', error);
//       throw error;
//     });
// }

// export default class Router {
//   $appRoot: HTMLElement;

//   constructor() {
//     this.$appRoot = document.querySelector('.js__root');

//     window.addEventListener('load', this.route.bind(this));
//     window.addEventListener('hashchange', this.route.bind(this));
//   }

//   route(e: any) {
//     e.preventDefault();

//     const component = ROUTES[window.location.pathname] || notFoundComp;

//     const eventType = 'route';
//     const eventPayload = { url: window.location.pathname };

//     sendEvent(eventType, eventPayload)
//       .then(() => {
//         console.log('Событие успешно отправлено');
//       })
//       .catch((error) => {
//         console.error('Ошибка при отправке события', error);
//       });

//     component.attach(this.$appRoot);
//     component.render();
//   }
// }
