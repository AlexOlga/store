import { Products } from "./view";
import { Model } from "./model";

/*interface Ifilter {
    SliderTime: [number, number];
    typeSorting: string;   
}*/

export class Controller {
    model: Model;
    view: Products;
    SliderTime: [number, number];
    typeSorting: string;
    constructor(baseLink: string, maxProductsInCart: number, SliderTime: [number, number], typeSorting: string) {
        this.model = new Model(baseLink, maxProductsInCart);
        this.view = new Products();
        this.SliderTime = SliderTime;
        this.typeSorting = typeSorting;
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
        this.typeSorting = sortingStatus.value
        this.model.sorting(sortingStatus.value)
    }

    handleSliderTime(values: number, handle: number) {
        this.SliderTime[handle] = values;
        this.model.load((data) => {
            data = data?.filter(item => (item.time >= this.SliderTime[0]) && (item.time <= this.SliderTime[1]));
            if (data !== undefined) this.view.draw(data);
            this.model.sorting(this.typeSorting);
        }
        );
    }

}

