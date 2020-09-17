import React, { Component } from "react";
import Api from "../../services/api";
import "./style.css";
import {Link} from 'react-router-dom'

export default class Main extends Component {
  state = {
    products: [],
    productInfo: [],
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
    this.prevPage();
    this.nextPage();
  }

  loadProducts = async (page) => {
      console.log(`/products?page=${page}`);
    const response = await Api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;
    this.setState({
      products: docs,
      productInfo: productInfo,
      page: page
    });
  };

  prevPage = () => {
    const { page} = this.state;

    if(page === 1){
        return;
    }

    const pageNumber = page - 1;
    this.loadProducts(pageNumber)
  };
  nextPage = () => {
      const { page, productInfo} = this.state;

      if(page === productInfo.pages){
          return;
      }

      const pageNumber = page +1;
      this.loadProducts(pageNumber)
  };

  render() {
    const { products, page, productInfo } = this.state;

    return (
      <div className="product-list">
        {products.map((product) => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Proximo</button>
        </div>
      </div>
    );
  }
}
