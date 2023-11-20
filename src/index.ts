import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { searchSuggestions } from "./services/searchSuggestionsData";
import { generateSearchSuggestions } from "./services/suggestions.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
userService.init();

generateSearchSuggestions(searchSuggestions);

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
