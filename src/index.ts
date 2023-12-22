import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";



(async () => {
  try {
    await userService.init();
    await cartService.init();
    new Router();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
})();



setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
