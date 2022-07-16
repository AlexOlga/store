import { arrayProducts } from './type'
export class Products {
    draw(data: arrayProducts) {
        const fragment = document.createDocumentFragment();
        const newsItemTemp = <HTMLTemplateElement>document.querySelector('#productItemTemp');
        data.forEach((item) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            (newsClone.querySelector('.product__button') as HTMLImageElement).dataset.id = `${item.id}`;
            (newsClone.querySelector('.product__img') as HTMLImageElement).src = item.urlToImage;
            (newsClone.querySelector('.product__name') as HTMLElement).textContent = item.name;
            (newsClone.querySelector('.product__description') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.product__range') as HTMLElement).textContent = `${item.range} а.е.`;
            (newsClone.querySelector('.product__time') as HTMLElement).textContent = `${item.time}`;
            (newsClone.querySelector('.product__placeVizit') as HTMLElement).textContent = item.placeVizit.join(' ');
            (newsClone.querySelector('.product__price') as HTMLElement).textContent = `${item.price}`;

            fragment.append(newsClone);
        });

        (document.querySelector('.products') as HTMLElement).innerHTML = '';
        (document.querySelector('.products') as HTMLElement).appendChild(fragment);
    }
    addProductInCart(elm: HTMLElement) {
        elm.dataset.add = "true"
        elm.textContent = "Передумать"
    }
    removeProductInCart(elm: HTMLElement) {
        elm.dataset.add = "false"
        elm.textContent = "В корзину"
    }

    getroductsOnPage() {
        const productsContener = <HTMLSelectElement>document.querySelector(".products");
        const productsOnPageList = productsContener.querySelectorAll('.product-item');
        const productsOnPageArray = Array.prototype.slice.call(productsOnPageList);
        return productsOnPageArray;
    }
}
