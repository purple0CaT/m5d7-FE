import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import BlogList from "../../components/blog/blog-list";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [productsArray, setProductsArray] = useState([]);

  const fetchProducts = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/`
      );
      let products = await response.json();
      setProductsArray(products);
      setLoading(false);
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcomennnnne</h1>
      <Row>
        {productsArray.map((product) => (
          <Col xs={12} md={4} className="my-3">
            <Link
              to={`/product/${product.id}`}
              className="myCard h-100 w-100 card"
            >
              <Card.Img variant="top" src={product.image_url} />
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
        ))}
      </Row>
    </Container>
  );
};

export default Home;
