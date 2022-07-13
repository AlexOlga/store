import './normalize.css'
import './global.css'
import './components/slider'
import { Loader } from './components/model'
import { Products } from './components/view'
const baseLink = './asset/product-catalog.json'
const app = new Loader(baseLink);
const view = new Products;

app.load((data) => {
    if (data !== undefined) view.draw(data);
})




