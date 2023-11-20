import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorites';

class FavoritesService {
    async init() {
        this._updCounters();
        this.toggleButton();
    }
    async addToFavorites(product: ProductData) {
        const favorites = await this.getFavorites();
        await this.setFavorites([...favorites, product]);
    }

    async removeFromFavorites(product: ProductData) {
        const favorites = await this.getFavorites();
        await this.setFavorites(favorites.filter(({ id }) => id !== product.id));
    }

    async clear() {
        await localforage.removeItem(DB);
        this._updCounters();
    }

    async getFavorites(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async setFavorites(data: ProductData[]) {
        await localforage.setItem(DB, data);
        this._updCounters();
    }

    async isInFavourites(product: ProductData) {
        const favorites = await this.getFavorites();
        return favorites.some(({ id }) => id === product.id);
    }

    async toggleButton() {
        const products = await this.getFavorites();
        const btn = document.querySelector('.favorites');

        if (btn) {
            if (products.length) {
                btn.classList.remove('hide');
            } else {
                btn.classList.add('hide');
            }
        }
    }

    private async _updCounters() {
        const products = await this.getFavorites();
        const count = products.length >= 10 ? '9+' : products.length;

        //@ts-ignore
        document.querySelectorAll('.js__favorite-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
    }
}
export const favoritesService = new FavoritesService();





