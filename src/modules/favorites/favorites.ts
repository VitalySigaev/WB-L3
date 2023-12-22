import { favoritesService } from '../../services/favorites.service';
import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorites.tpl.html';
import { ProductData } from 'types';

class Checkout extends Component {
    favorites!: ProductData[];

    async render() {
        this.favorites = await favoritesService.getFavorites();

        if (this.favorites.length < 1) {
            this.view.root.classList.add('is__empty');
            return;
        }

        this.favorites.forEach((product) => {
            const favoritesComp = new Product(product);
            favoritesComp.render();
            favoritesComp.attach(this.view.favorites);
        });


        this.view.btnOrder.onclick = this._clearFavorites.bind(this);
    }

    private async _clearFavorites() {
        await favoritesService.clear();
        await favoritesService.toggleButton();
        this.render();
    }
}

export const favoritesComp = new Checkout(html); 
