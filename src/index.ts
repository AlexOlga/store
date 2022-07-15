import './normalize.css'
import './global.css'
import * as noUiSlider from 'nouislider';
import './components/slider'
import { Controller } from './components/controler'
import { maxTime, minTime } from './components/slider';

const baseLink = './asset/product-catalog.json'
const maxProductsInCart = 5; //максимальное возможное количество товаров в корзине 
const app = new Controller(baseLink, maxProductsInCart, [minTime, maxTime], "0", '');


app.start();
const productsBlok = document.querySelector('.products') ? document.querySelector('.products') : console.log('блок не найден');
productsBlok?.addEventListener('click', (e: Event) => app.handleProduct(e));


const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
sortingStatus.addEventListener('change', () => app.handleSorting())

const sliderTime = document.getElementById('slider-time') as noUiSlider.target;
const timeValues: Array<HTMLInputElement> = [
    <HTMLInputElement>document.getElementById('slider-time-value-lower'),
    <HTMLInputElement>document.getElementById('slider-time-value-upper')
];

if (sliderTime.noUiSlider !== undefined) {
    sliderTime.noUiSlider.on('update', function (values, handle) {
        timeValues[handle].value = `${values[handle]}`;
        app.handleSliderTime(Number(values[handle]), handle)
    });
}