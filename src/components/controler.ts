import { Products } from "./view";
import { Model } from "./model";
class Controller {
    model: Model;
    view: Products
    constructor(baseLink: string) {
        this.model = new Model(baseLink);
        this.view = new Products();
    }
    /* 
    addInCart(isCart:boolean) {
        let cartNumber: string | number | null;
        cartNumber = (document.querySelector('.cart__number') as HTMLElement).textContent;
        if (cartNumber) cartNumber = +cartNumber;
        
    }
*/
}