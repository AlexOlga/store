import { arrayProducts } from './type'
export class Products {
    draw(data: arrayProducts) {
        const fragment = document.createDocumentFragment();
        const newsItemTemp = <HTMLTemplateElement>document.querySelector('#productItemTemp');
        data.forEach((item) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            (newsClone.querySelector('.product__img') as HTMLImageElement).src = item.urlToImage;
            (newsClone.querySelector('.product__name') as HTMLElement).textContent = item.name;
            (newsClone.querySelector('.product__description') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.product__range') as HTMLElement).textContent = `${item.range} а.е.`;
            (newsClone.querySelector('.product__time') as HTMLElement).textContent = `${item.time}`;
            (newsClone.querySelector('.product__placeVizit') as HTMLElement).textContent = item.placeVizit.join(' ');
            (newsClone.querySelector('.product__price') as HTMLElement).textContent = `${item.price} у.е.`;
            fragment.append(newsClone);
        });

        (document.querySelector('.products') as HTMLElement).innerHTML = '';
        (document.querySelector('.products') as HTMLElement).appendChild(fragment);
    }
}
