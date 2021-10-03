import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "./Cart";
// import BlogList from "../../components/blog/blog-list";

const Home = () => {
  const [LoadPageBtn, setLoadPageBtn] = useState(true);
  const [productsArray, setProductsArray] = useState([]);
  const [Pages, setPages] = useState({ pages: "", curentP: 1 });
  const [Categ, setCateg] = useState();
  const [Search, setSearch] = useState(false);
  const [CatLoad, setCatLoad] = useState(true);
  const [CartAdd, setCartAdd] = useState({ userId: 1 });
  const [LastAdd, setLastAdd] = useState([]);

  //=FETCH ALL PRODUCTS
  const fetchProducts = async (page, search) => {
    let searchVal = typeof search !== "undefined" ? search : "";
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products?search=${searchVal}&page=${page}`
      );
      if (response.ok) {
        let products = await response.json();
        setProductsArray(products[0]);
        setPages(products[1]);
        setSearch(searchVal ? false : true);
        setLoadPageBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //= FETCH CATEGORY
  const fetchCateg = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/categories`
      );
      if (response.ok) {
        let data = await response.json();
        setCateg(data);
        setSearch(true);
        setCatLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // === ADD TO CART
  const addToCart12 = (prodId) => {
    console.log(prodId);
  };
  const addToCart = async (prodId) => {
    await setCartAdd({ ...CartAdd, productId: prodId });
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/cart/${prodId}`,
        {
          method: "POST",
          body: JSON.stringify(CartAdd),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        alert("Added!");
        setLastAdd(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(1);
    fetchCateg();
  }, []);

  return (
    <Container fluid="sm">
      {/* CART */}
      <Cart lastCard={LastAdd} />
      {/* === */}
      <Row>
        <Col xs="12" md="9">
          <h1 className="blog-main-title">Welcomennnne</h1>
        </Col>
        <Col xs="12" md="3">
          <Form.Control
            className="mt-3"
            as="select"
            onChange={(e) => fetchProducts(1, e.target.value)}
          >
            <option value="">none</option>
            {!CatLoad &&
              Categ.map((c) => <option value={c.id}>{c.text}</option>)}
          </Form.Control>
        </Col>
      </Row>
      <Row className={LoadPageBtn && "justify-content-center"}>
        {LoadPageBtn ? (
          <Spinner className="mt-5" animation="border" role="status" />
        ) : (
          productsArray.map((product) => (
            <Col xs={12} md={4} className="my-3">
              <div className="myCard h-100 w-100 card">
                <Link to={`/product/${product.id}`} className="anchorUnset">
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body className="px-3 pb-2 text-dark d-flex flex-column">
                    <Card.Title>
                      {product.brand} {product.name}
                    </Card.Title>
                    <p className="m-0 font-weight-bold text-black-50">
                      Price :£{product.price}
                    </p>
                  </Card.Body>
                </Link>
                <div
                  className="mt-auto text-center"
                  style={{ borderTop: "1px solid rgb(128,128,128, 0.5)" }}
                >
                  <button
                    onClick={(e) => addToCart(product.id)}
                    className="btn btn-info my-1"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
      <Row className="justify-content-center my-3 gap">
        {LoadPageBtn &&
          Search &&
          Array.from({ length: Math.ceil(Pages.pages / 5) }, (v, i) => i).map(
            (m) => (
              <Col
                className="page text-center"
                xs={1}
                key={13 + m + "h123ffas"}
              >
                <button
                  value={m + 1}
                  onClick={(e) => fetchProducts(e.target.value)}
                >
                  {m + 1}
                </button>
              </Col>
            )
          )}
      </Row>
    </Container>
  );
};

export default Home;
