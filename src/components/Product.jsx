import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Button,
  Image,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
import { withRouter } from "react-router";
// import uniqid from "uniqid";

const Product = ({ match }) => {
  const { id } = match.params;

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    comment: "",
    rate: "",
    productId: id,
  });
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const fetchProduct = async (id) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/${id}`
      );
      let productObj = await response.json();
      setProduct(productObj);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const fileFormData = new FormData();
    fileFormData.append("image", file);

    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/${id}/uploadPhoto`,
        {
          method: "PUT",
          body: fileFormData,
        }
      );
      if (response.ok) {
        setOpen(false);
        fetchProduct(id);
        alert("Success!");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async (id) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/${id}/reviews`
      );
      let fetchedReviews = await response.json();
      setReviews(fetchedReviews);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postNewReview = async (e) => {
    e.preventDefault(e);
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/reviews`,
        {
          method: "POST",
          body: JSON.stringify(newReview),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Success!");
        fetchReviews(id);
      } else {
        alert("Error !");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct(id);
    fetchReviews(id);
  }, []);

  return (
    <div className="product-details-root">
      <Container>
        <Row>
          <Col xs="12" md={9} className="p-5">
            <img
              className="product-details-cover w-100"
              src={product.imageUrl}
            />
            <div className="p-3">
              <h1 className="product-details-title">{product.name}</h1>
              <h4 className="product-details-title">{product.brand}</h4>

              <div className="product-details-container">
                <div className="product-details-author">
                  Price: £{product.price}
                </div>
                <div className="product-details-info">
                  <div>{product.createdAt}</div>
                  {/* <div>{`${product.readTime.value} ${product.readTime.unit} read`}</div> */}
                </div>
              </div>
              <hr />
              <Button
                className="mt-3"
                onClick={() => setOpen(true)}
                size="lg"
                variant="dark"
              >
                {" "}
                Upload Cover
              </Button>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className="mt-5">
              <h4 className="text-center">Reviews</h4>
              <hr />
              <div style={{ maxHeight: "17rem", overflowY: "scroll" }}>
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="my-1 d-flex flex-column p-2"
                    style={{
                      border: "1px solid #C0C0C0",
                      borderRadius: "10px",
                    }}
                  >
                    <h5>{review.comment}</h5>
                    <small>
                      Rate:{" "}
                      {Array.from({ length: review.rate }).map((x) =>
                        review.rate >= 3 ? "⭐️" : "🍅"
                      )}
                    </small>
                    <small>{review.createdAt}</small>
                    <small className="text-muted">id: {review._id}</small>
                  </div>
                ))}
              </div>

              <hr />
              {/* UPDATE IMG */}
              <Form
                className="p-2"
                onSubmit={postNewReview}
                style={{ border: "1px solid #C0C0C0", borderRadius: "10px" }}
              >
                <h5 className="text-center">Leave a review</h5>
                <Form.Group>
                  <Form.Control
                    defaultValue="1"
                    size="auto"
                    as="select"
                    onChange={(e) =>
                      setNewReview({ ...newReview, rate: e.target.value })
                    }
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Control>
                  <Form.Control
                    size="auto"
                    placeholder="Comment"
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                  />
                  <Form.Group className="d-flex justify-content-center mt-3">
                    <Button type="submit" size="lg" variant="dark">
                      Submit Review
                    </Button>
                  </Form.Group>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
        {/* IMG UPLOAD */}
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={open}
          animation={false}
        >
          <Modal.Header>
            <Modal.Title>Upload Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitForm}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Choose</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log(`Number 1 ${e.target}`);
                    console.log(e.target.files);
                    console.log(file);
                    setFile(file);
                  }}
                  accept="image/*"
                  type="file"
                  placeholder="Photo"
                  required
                />
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button type="submit" size="lg" variant="dark">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default withRouter(Product);
