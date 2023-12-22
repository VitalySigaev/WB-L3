import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { searchSuggestionsData } from "./services/searchSuggestionsData";
import { generateSearchSuggestions } from "./services/searchSuggestions.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
userService.init();


generateSearchSuggestions(searchSuggestionsData);

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
