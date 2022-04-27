import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'


class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalValue: 0,
      receivedValue: 0,
      changeValue: 0,
      clientName: '',
      orderNumber: '',
      textSearch: '',
      qtyProduct: '',
      cart: [],
      resultproducts: []
    }
    this.addCart = this.addCart.bind(this);
  }

  componentDidMount() {
    this.searchProducts();
  }

  addCart(event) {
    //Função pra adicionar ao carrinho
    //data-id={product.id} data-price={product.price} data-name={product.name}data-score={product.score} data-img={product.img}
    console.log(event.target);

    const product = {
      id: event.target.dataset.id,
      name: event.target.dataset.name,
      score: event.target.dataset.score,
      image: event.target.dataset.image,
      qty: event.target.dataset.qty,
      price: event.target.dataset.price
    }
    var newCart = this.state.cart;
    newCart.push(product);
    this.setState({ cart: newCart });
    this.updateTotal();


  };

  searchProducts() {

    //  setAppState({ loading: true });
    const apiUrl = 'http://localhost:3001/products';
    axios.get(apiUrl).then((resp) => {
      const products = resp.data;
      var produtos = [];
      products.map((product, index) => {
        produtos.push({
          id: product.id, price: product.price, image: product.image,
          name: product.name, score: product.score, qty: 1
        });
      });
      this.setState({ resultproducts: products });
    });

    //Funçãoa pra buscar produto

    console.log(this.state.resultproducts);
  };


  updateItem(event) {
    //atualiza qtd item carrinho
    var newCart = this.state.cart;
    newCart[event.target.dataset.index].qty = event.target.value;

    this.setState({ cart: newCart });
    this.updateTotal();
  }

  removeItem(event) {
    //remove item do carrinho
    var newCart = this.state.cart;
    delete newCart[event.target.dataset.index];

    this.setState({ cart: newCart });
    this.updateTotal();
  }

  updateTotal() {
    var total = 0;
    this.state.cart.map((item, index) => {
      total = total + (parseFloat(item.price) * parseInt(item.qty));
    });
    var newChangeValue = parseFloat(this.state.receivedValue) - parseFloat(total);
    this.setState({ totalValue: total, changeValue: newChangeValue });
  }

  changeQty(event) {
    var newresults = this.state.resultproducts;
    newresults[event.target.dataset.index].qty = event.target.value;
    this.setState({ resultproducts: newresults });
  }

  render() {
    return (
      <div>

        <section>
          <div class="container py-3">
            <div class="row align-items-center">
              <div class="col align-self-center">
                <h1>Ecommerce de Games</h1>
              </div>


            </div>
          </div>
          <div class="container">
            <div class="row justify-content-center py-3">
              {this.state.resultproducts.length > 0  && 
              this.state.resultproducts.map((product, index) => (
                <div class="col-3">
                  <div class="container py-3">
                    <div class="row justify-content-center">
                      <div class="col">
                        {<img src={"/img/" + product.image} className="img-thumbnail" alt="" />}
                      </div>
                    </div>
                    <div class="row mt-1">
                      <div class="col">
                        <div class="name">
                          <span>{product.name}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="price">
                          <span>{product.price}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <div class="score">
                          <span>{product.score}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col">
                        <input class="input-product" data-index={index} type="number" aria-label="Value"
                          defaultValue={product.qty}
                          onChange={this.changeQty.bind(this)} />
                      </div>
                      <div class="col">
                        {<button type="button" class="btn btn-outline-success btn-sm"
                          data-id={product.id} data-qty={product.qty} data-price={product.price} data-name={product.name}
                          data-score={product.score} data-image={product.image}
                          onClick={this.addCart.bind(this)}>Add</button>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
               {this.state.resultproducts.length <= 0  && 
                <div class="container">
                  <div className='row d-flex justify-content-center'>
                    <div className='col-lg-6'>
                      <img src='/img/Loading_2.gif'></img>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>



          <div class="container align-self-center">
            <div class="input-group row align-items-center">
              <div class="col align-self-center">
                <span class="input-group-text">Itens do pedido</span>
              </div>
            </div>
            {this.state.cart.map((item, index) => (
              <div class="input-group row justify-content-center mt-3">
                <div class="col align-self-center">
                  <img src={"/img/" + item.image} width="50" margin="35" alt="" />
                  <span>{item.name}</span>
                </div>
                <div class="col align-self-center">
                  <input type="number" aria-label="Value" data-index={index} class="form-control" defaultValue={item.qty} onChange={this.updateItem.bind(this)} />
                </div>
                <div class="col align-self-center">
                  <span>{(parseFloat(item.price) * parseInt(item.qty))}</span>
                </div>
                <div class="col-1 align-self-center">
                  <button class="btn btn-outline-danger" data-index={index} value={item.value} onClick={this.removeItem.bind(this)}>X</button>
                </div>
              </div>
            )
            )
            }

          </div>
          <div class="container py-5">
            <div class="row">

              <div class="col">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <div>Valor Total do Pedido</div>
                    </div>
                    <div class="col">
                      <span id="valor-total">R$ {this.state.totalValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="container">
            <div class="row py-3">
              <div class="col d-grid gap-2 col-6 mx-auto">
                <button type="button" class="btn btn-outline-success btn-lg" >Finalizar pedido</button>
              </div>
            </div>
          </div>
        </section>



      </div>
    );
  }
}

export default Orders;