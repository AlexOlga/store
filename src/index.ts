import './normalize.css'
import './global.css'
import * as noUiSlider from 'nouislider';
import './components/slider'
import { Controller } from './components/controler'
import { maxTime, minTime, maxRange, minRange } from './components/slider';
import { Ifilter } from './components/type'

const baseLink = './asset/product-catalog.json'
const maxProductsInCart = 5; //максимальное возможное количество товаров в корзине 
const filterStart: Ifilter = {
    SliderTime: [minTime, maxTime],
    SliderRange: [minRange, maxRange],
    typeSorting: "0",
    productInCart: "",
    placeVizitId: "",
    favorit: false
}
const app = new Controller(baseLink, maxProductsInCart, filterStart);

app.start();

//добавление в конзину

const productsBlok = document.querySelector('.products') ? document.querySelector('.products') : console.log('блок не найден');
productsBlok?.addEventListener('click', (e: Event) => app.handleProduct(e));

//сортировка

const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
sortingStatus.addEventListener('change', () => app.handleSorting())

//слайдер тайм

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

//слайдер растояние

const slideRange = document.getElementById('slider-range') as noUiSlider.target;
const rangeValues: Array<HTMLInputElement> = [
    <HTMLInputElement>document.getElementById('slider-range-value-lower'),
    <HTMLInputElement>document.getElementById('slider-range-value-upper')
];

if (slideRange.noUiSlider !== undefined) {
    slideRange.noUiSlider.on('update', function (values, handle) {
        rangeValues[handle].value = `${values[handle]}`;
        app.handleSliderRange(Number(values[handle]), handle);
    });
}

//объекты

const objectBody = document.querySelector('.object-body');
objectBody?.addEventListener('click', (e: Event) => app.handleObjectBlock(e));

//избранное

const favoritBody = document.querySelector('.favorit-body');
favoritBody?.addEventListener('click', (e: Event) => app.handleFavorit(e));
