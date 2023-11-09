import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorites';

class FavoritesService {

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
    }

    async getFavorites(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async setFavorites(data: ProductData[]) {
        await localforage.setItem(DB, data);

    }

    async isInFavourites(product: ProductData) {
        const favorites = await this.getFavorites();
        return favorites.some(({ id }) => id === product.id);

    }

    async toggleButton() {
        const products = await this.getFavorites();
        const btn = document.querySelector('.favorites');
        if (products.length) {
            btn.classList.remove('hide');
        }
        else {
            btn.classList.add('hide');
        }

    }
}
export const favoritesService = new FavoritesService();





