import React, { Component } from "react";
import Api from "../../services/api";
import "./style.css";

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
    const { page, productInfo} = this.state;
    
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
    const { products } = this.state;

    return (
      <div className="product-list">
        {products.map((product) => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <a href={product.url} target="_.blanket">
              Acessar
            </a>
          </article>
        ))}
        <div className="actions">
          <button onClick={this.prevPage}>Anterior</button>
          <button onClick={this.nextPage}>Proximo</button>
        </div>
      </div>
    );
  }
}
