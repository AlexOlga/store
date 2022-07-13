type GenericCallback<T> = (data?: T) => void;
import { arrayProducts } from './type'
export class Loader {
    baseLink: string;
    constructor(baseLink: string) {
        this.baseLink = baseLink;
    }
    load(callback: GenericCallback<arrayProducts>): void {
        fetch(this.baseLink)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}
