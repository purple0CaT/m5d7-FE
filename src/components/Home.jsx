import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
// import BlogList from "../../components/blog/blog-list";

const Home = () => {
  const [Loading, setLoading] = useState(true);
  const [productsArray, setProductsArray] = useState([]);
  const [Pages, setPages] = useState({ pages: "", curentP: 1 });
  const [Categ, setCateg] = useState();
  //=
  const fetchProducts = async (page, search) => {
    let searchVal = typeof search !== "undefined" ? search : "";
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products?search=${searchVal}&page=${page}`
      );
      let products = await response.json();
      setProductsArray(products[0]);
      setPages(products[1]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  //=
  const fetchCateg = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/categories`
      );
      let data = await response.json();
      setCateg(data);
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
      <Row>
        <Col xs="12" md="9">
          <h1 className="blog-main-title">Welcomennnnne</h1>
        </Col>
        <Col xs="12" md="3">
          <Form.Control
            className="mt-3"
            as="select"
            onChange={(e) => fetchProducts(1, e.target.value)}
          >
            <option value="">none</option>
            {!Loading &&
              Categ.map((c) => <option value={c.text}>{c.text}</option>)}
          </Form.Control>
        </Col>
      </Row>
      <Row className={Loading && "justify-content-center"}>
        {Loading ? (
          <Spinner className="mt-5" animation="border" role="status" />
        ) : (
          productsArray.map((product) => (
            <Col xs={12} md={4} className="my-3">
              <Link
                to={`/product/${product.id}`}
                className="myCard h-100 w-100 card"
              >
                <Card.Img variant="top" src={product.image} />
                <Card.Body className="px-3 pb-2 text-dark">
                  <Card.Title>
                    {product.brand} {product.name}
                  </Card.Title>
                  <p className="m-0 font-weight-bold text-black-50">
                    Price :£{product.price}
                  </p>
                </Card.Body>
              </Link>
            </Col>
          ))
        )}
      </Row>
      <Row className="justify-content-center my-3">
        {!Loading &&
          Array.from({ length: Math.ceil(Pages.pages / 5) }, (v, i) => i).map(
            (m) => (
              <Col className="page text-center" xs={1} key={123 + m + "h"}>
                <button
                  value={m + 1}
                  // className={Pages.curentP + 1 === this.value && "activeP"}
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
