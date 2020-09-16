import React, {
    Component
} from 'react';
import Api from '../../services/api'

export default class Main extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await Api.get('/products');
        this.setState({
            products: response.data.docs
        });
    }

    render() {

        const {products} = this.state;

        return (
            <div className="product-list">
                {products.map( product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                    </article>
                ))}
            </div>
        )
    }
}