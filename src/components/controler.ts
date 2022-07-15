import { Products } from "./view";
import { Model } from "./model";

export class Controller {
    model: Model;
    view: Products;

    constructor(baseLink: string, maxProductsInCart: number) {
        this.model = new Model(baseLink, maxProductsInCart);
        this.view = new Products();

    }
    start() {
        this.model.load((data) => {
            if (data !== undefined) this.view.draw(data);
        })
    }
    handleProduct(e: Event) {
        const elm = e.target as HTMLElement;
        if (elm.classList.contains("product__button")) this.model.changeStatusProduct(elm);
    }

    handleSorting() {
        const sortingStatus = <HTMLSelectElement>document.querySelector(".sorting");
        this.model.sorting(sortingStatus.value)
    }

}

