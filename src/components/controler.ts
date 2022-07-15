import { Products } from "./view";
import { Model } from "./model";
//import { arrayProducts} from "./type"
export class Controller {
    model: Model;
    view: Products;
    productInCart: object;
    typeSorting: string;
    constructor(baseLink: string, maxProductsInCart: number, productInCart: object = {}, typeSorting = "0") {
        this.model = new Model(baseLink, maxProductsInCart);
        this.view = new Products();
        this.productInCart = productInCart;
        this.typeSorting = typeSorting;

    }
    start() {
        this.model.load((data) => {
            if (data !== undefined) this.view.draw(data);
        })
    }

    changeStatusProduct(e: Event) {
        const elm = e.target as HTMLElement;
        if (elm.classList.contains("product__button")) {
            const cart = (document.querySelector('.cart__number') as HTMLElement)
            let cartNumber = cart.textContent ? +cart.textContent : 0;
            if (elm.dataset.add === "false") {
                if (this.model.isFullCart(cartNumber)) { alert("Извините, все слоты заполнены") }
                else {
                    this.view.addProductInCart(elm)
                    /*  const poductId: string=  JSON.stringify(elm.dataset.id);
                      this.productInCart[poductId]=1
                      //if (elm.dataset.id !==undefined){ this.productInCart[elm.dataset.id]=1 } 
                      // if (idProduct !==undefined){ this.productInCart[idProduct]=1 } */
                    cartNumber++
                }
            }
            else {
                this.view.removeProductInCart(elm)
                //  delete this.productInCart[elm.dataset.id]
                cartNumber--
            }
            cart.textContent = `${cartNumber}`
        }
    }
    handleSorting() {
        const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
        this.typeSorting = sortingStatus.value;
        this.model.sorting(sortingStatus.value)
    }

}

