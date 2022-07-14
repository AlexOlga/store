import './normalize.css'
import './global.css'
import './components/slider'
import { Model } from './components/model'
import { Products } from './components/view'

const baseLink = './asset/product-catalog.json'
const app = new Model(baseLink);
const view = new Products;
const maxProductsInCart = 5; //максимальное возможное количество товаров в корзине 

app.load((data) => {
    if (data !== undefined) view.draw(data);
})

const productsBlok = document.querySelector('.products') ? document.querySelector('.products') : console.log('блок не найден');
/*добавление в корзину*/
function changeStatusProduct(e: Event) {
    const elm = e.target as HTMLElement;
    if (elm.classList.contains("button")) {
        const cart = (document.querySelector('.cart__number') as HTMLElement)
        let cartNumber = cart.textContent ? +cart.textContent : 0;
        if (elm.dataset.add === "false") {
            if (isFullCart(cartNumber)) { alert("Извините, все слоты заполнены") }
            else {
                elm.dataset.add = "true"
                elm.textContent = "Передумать"
                cartNumber++
            }

        }
        else {
            elm.dataset.add = "false"
            elm.textContent = "В корзину"
            cartNumber--
        }
        cart.textContent = `${cartNumber}`
    }
}
const isFullCart = (cartNumber: number) => cartNumber === maxProductsInCart ? true : false;
productsBlok?.addEventListener('click', changeStatusProduct);

/*Сортировка*/
function sorting() {
    if (sortingStatus.value === "0") return;
    const productsContener = (document.querySelector('.products') as HTMLElement);
    const productsOnPageList = productsContener.querySelectorAll('.product-item');
    const productsOnPageArray = Array.prototype.slice.call(productsOnPageList);
    console.log('1', productsOnPageArray);

    if (sortingStatus.value === "alphabet-forvard") {
        productsOnPageArray.sort((a: HTMLElement, b: HTMLElement): number => {
            const elm1 = (a.querySelector('.product__name') as HTMLElement).textContent;
            const elm2 = (b.querySelector('.product__name') as HTMLElement).textContent;
            if (elm1 && elm2) {
                if (elm1 < elm2) return -1;
                if (elm1 > elm2) return 1;
            }
            return 0;

        });
    }

    if (sortingStatus.value === "alphabet-revers") {
        productsOnPageArray.sort((a: HTMLElement, b: HTMLElement): number => {
            const elm1 = (a.querySelector('.product__name') as HTMLElement).textContent;
            const elm2 = (b.querySelector('.product__name') as HTMLElement).textContent;
            if (elm1 && elm2) {
                if (elm1 < elm2) return 1;
                if (elm1 > elm2) return -1;
            }
            return 0;

        });
    }
    if (sortingStatus.value === "price-forvard") {
        productsOnPageArray.sort((a: HTMLElement, b: HTMLElement): number => {
            const elm1 = Number((a.querySelector('.product__price') as HTMLElement).textContent);
            const elm2 = Number((b.querySelector('.product__price') as HTMLElement).textContent);
            if (elm1 && elm2) {
                if (elm1 < elm2) return -1;
                if (elm1 > elm2) return 1;
            }
            return 0;

        });
    }
    if (sortingStatus.value === "price-revers") {
        productsOnPageArray.sort((a: HTMLElement, b: HTMLElement): number => {
            const elm1 = Number((a.querySelector('.product__price') as HTMLElement).textContent);
            const elm2 = Number((b.querySelector('.product__price') as HTMLElement).textContent);
            if (elm1 && elm2) {
                if (elm1 > elm2) return -1;
                if (elm1 < elm2) return 1;
            }
            return 0;

        });
    }
    productsContener.innerHTML = '';
    productsOnPageArray.forEach((item) => { productsContener.appendChild(item) });

}
const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
sortingStatus.addEventListener('change', sorting)

