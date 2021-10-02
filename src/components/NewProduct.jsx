import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const NewProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
  });
  const [imgFile, setimgFile] = useState();
  const history = useHistory();
  const createNewProduct = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products`,
        {
          method: "POST",
          body: JSON.stringify(newProduct),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        submitForm(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // IMAGE
  const submitForm = async (id) => {
    const fileFormData = new FormData();
    fileFormData.append("image", imgFile);

    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/${id}/uploadPhoto`,
        {
          method: "POST",
          body: fileFormData,
        }
      );
      if (response.ok) {
        alert("Success!");
        history.push("/");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadProduct = (e) => {
    e.preventDefault();
    createNewProduct();
  };

  return (
    <Container className="new-product-container w-50" md="w-50">
      <Form className="mt-5" onSubmit={uploadProduct}>
        <Form.Group controlId="product-form" className="mt-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            value={newProduct.brand}
            size="lg"
            placeholder="Brand"
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="product-form" className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={newProduct.name}
            size="lg"
            placeholder="Name"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="product-form" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={newProduct.price}
            size="lg"
            placeholder="Price"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="product-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          >
            <option>Phone</option>
            <option>Not phone</option>
            <option>Laptop</option>
            <option>Not laptop</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="product-form" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={newProduct.description}
            size="lg"
            placeholder="Description"
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </Form.Group>
        <Form>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Example file input"
              onChange={(e) => setimgFile(e.target.files[0])}
            />
          </Form.Group>
        </Form>

        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{ marginLeft: "1rem" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewProduct;
