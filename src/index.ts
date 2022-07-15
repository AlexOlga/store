import './normalize.css'
import './global.css'
import './components/slider'
import { Controller } from './components/controler'

const baseLink = './asset/product-catalog.json'
const maxProductsInCart = 5; //максимальное возможное количество товаров в корзине 
const app = new Controller(baseLink, maxProductsInCart);


app.start();
const productsBlok = document.querySelector('.products') ? document.querySelector('.products') : console.log('блок не найден');
productsBlok?.addEventListener('click', (e: Event) => app.handleProduct(e));


const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
sortingStatus.addEventListener('change', () => app.handleSorting())

