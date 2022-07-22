
import { Ifilter } from '../components/type'
import { Controller } from '../components/controler'

const maxProductsInCart = 5; //максимальное возможное количество товаров в корзине 
const baseLink = '../asset/product-catalog.json'
const filterStart: Ifilter = {
    SliderTime: [11, 677],
    SliderRange: [2, 117],
    typeSorting: "0",
    productInCart: "",
    placeVizitId: "",
    favorit: false
}
const app = new Controller(baseLink, maxProductsInCart, filterStart);

describe("метод isFullCart", () => {

    test('isFullCart', () => {
        const cartNumber = maxProductsInCart;
        const isFullCart = app.isFullCart(cartNumber)
        expect(isFullCart).toBe(true);
    });
    test('Test product filter by range', () => {
        const cartNumber = maxProductsInCart - 1;
        const isFullCart = app.isFullCart(cartNumber)
        expect(isFullCart).toBe(false);
    });

});
document.body.innerHTML = `
<div class="products">   
</div>
 <template id="productItemTemp">
  <div class="product-item">
    <img class="product__img" src="./asset/img/0.webp">
    <div class="product-content">
      <h4 class="product__name" >Огненный пояс</h4>
      <p class="product__text product__description" > Пролёт по баллистическим траекториям</p>
      <p class="product__text"> Дальность путешествия: <span class="product__range" >1.8 a.e. </span></p>
      <p class="product__text">Длительность тура: <span class="product__time" >11 суток</span></p>
      <p class="product__text">Посещаемые объекты: <span class="product__placeVizit" >"Меркурий", "Венера"</span></p>
      <p class="product__text"> Цена: <span class="product__price"> 10690</span> у.е.</p>       
    </div>
    <div class= "product__button-contener">
      <button class=" button product__button" data-add="false" data-id="">В корзину</button>
    </div>     
  </div>
</template>
`;
const data = [{
    "id": 0,
    "name": "Огненный пояс",
    "urlToImage": "./asset/img/0.jpg",
    "time": 11,
    "placeVizit": [
        "Меркурий",
        "Венера"
    ],
    "placeVizitId": [
        "mercury",
        "venus"
    ],
    "description": "Пролёт по баллистическим траекториям",
    "range": 2,
    "price": 10690,
    "favorit": false
},
{
    "id": 1,
    "name": "По следам первых",
    "urlToImage": "./asset/img/1.jpg",
    "time": 21,
    "placeVizit": [
        "Луна",
        "Марс"
    ],
    "placeVizitId": [
        "moon",
        "mars"
    ],
    "description": "1 день на орбите луны, осмотр мест высадки астронавтов, места работы луноходов в телескоп. Облёт Марса с аналогичными наблюдениями",
    "range": 3,
    "price": 21372,
    "favorit": false
},
{
    "id": 8,
    "name": "По следам первых плюс",
    "urlToImage": "./asset/img/8.jpg",
    "time": 21,
    "placeVizit": [
        "Луна",
        "Венера",
        "Марс"
    ],
    "placeVizitId": [
        "moon",
        "mars",
        "venus"
    ],
    "description": "Высадка на поверхность луны и Марса в одном из памятных мест на выбор.",
    "range": 4,
    "price": 21715,
    "favorit": true
}]
app.view.draw(data);
describe("class  Products ", () => {
    test('test method draw', () => {
        const ProductsList = document.querySelectorAll('.product-item');
        expect(ProductsList).toHaveLength(3);
    });
    test('test method  addProductInCart', () => {
        const elm = <HTMLElement>document.querySelector('.product__button');
        if (elm) elm.dataset.add = "false"
        app.view.addProductInCart(elm);
        expect(elm.textContent).toBe("Передумать");
        const parentElm = elm.closest('.product-item');
        expect(parentElm?.classList).toContain("product-item_active");
    });
    test('test method  removeProductInCart', () => {
        const elm = <HTMLElement>document.querySelector('.product__button');
        if (elm) elm.dataset.add = "true"
        app.view.removeProductInCart(elm);
        expect(elm.textContent).toBe("В корзину");
        const parentElm = elm.closest('.product-item');
        expect(parentElm?.classList).not.toContain("product-item_active");
    });
    test('test method getProductsOnPage()', () => {
        const arrayProducts = app.view.getProductsOnPage();
        const str = arrayProducts[0].textContent;
        expect(arrayProducts).toHaveLength(3);
        expect(str.includes('Огненный пояс')).toBe(true);
    });


});

describe("class Model ", () => {
    test('test method sorting value=alphabet-revers', () => {
        let arrayProducts = app.view.getProductsOnPage();
        app.model.sorting(arrayProducts, "alphabet-revers");
        arrayProducts = app.view.getProductsOnPage();
        const str = arrayProducts[0].textContent;
        expect(str.includes('По следам первых плюс')).toBe(true);
    });
    test('test method sorting value=price-forvard', () => {
        let arrayProducts = app.view.getProductsOnPage();
        app.model.sorting(arrayProducts, "price-forvard");
        arrayProducts = app.view.getProductsOnPage();
        const str = arrayProducts[0].textContent;
        expect(str.includes('10690')).toBe(true);
    });
    test('test method sorting value=price-revers', () => {
        let arrayProducts = app.view.getProductsOnPage();
        app.model.sorting(arrayProducts, "price-revers");
        arrayProducts = app.view.getProductsOnPage();
        const str = arrayProducts[0].textContent;
        expect(str.includes('21715')).toBe(true);
    });
})