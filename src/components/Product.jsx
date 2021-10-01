import React, { useState, useEffect } from "react";
import {
  Container,
  Modal,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { withRouter } from "react-router";
// import uniqid from "uniqid";

const Product = ({ match }) => {
  const { id } = match.params;

  const [product, setProduct] = useState([]);
  const [Loading, setLoading] = useState(true);
  // const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    comment: "",
    rate: "",
    product_id: id,
  });
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState({ img: "" });

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setProduct(data[0]);
        setLoading(false);
        console.log(product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // IMAGE SENT
  const submitForm = async (e) => {
    e.preventDefault();
    const fileFormData = new FormData();
    fileFormData.append("image", file.img);

    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/${id}/uploadPhoto`,
        {
          method: "POST",
          body: fileFormData,
        }
      );
      if (response.ok) {
        setOpen(false);
        alert("Success!");
        fetchProduct(id);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  // New Review
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
        // fetchReviews(id);
      } else {
        alert("Error !");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct(id);
    // fetchReviews(id);
  }, []);

  return (
    <div className="product-details-root">
      <Container className={Loading && "text-center"}>
        {!Loading && product ? (
          <Row>
            <Col xs="12" md={9} className="p-1">
              <img
                className="product-details-cover w-100"
                src={product.image}
                style={{ maxHeight: "20rem", objectFit: "contain" }}
              />
              <div className="p-2">
                <h1 className="product-details-title">{product.name}</h1>
                <h4 className="product-details-title">{product.brand}</h4>

                <div className="product-details-container">
                  <div className="product-details-author">
                    <p>{product.description}</p>
                    Price: £{product.price}
                  </div>
                  <div className="product-details-info">
                    <div>{product.created_at}</div>
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
                <div className="reviewCont">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="my-1 d-flex flex-column p-2"
                        style={{
                          border: "1px solid #C0C0C0",
                          borderRadius: "10px",
                        }}
                      >
                        <h5>{review.text}</h5>
                        <small>
                          Rate:{" "}
                          {Array.from({ length: review.rate }).map((x) =>
                            review.rate >= 3 ? "⭐️" : "🍅"
                          )}
                        </small>
                        <small>{review.createdAt}</small>
                        <small className="text-muted">User: {review.user.name}</small>
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
                      className="mt-1"
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
        ) : (
          <Spinner
            className="mt-5 text-center"
            animation="border"
            role="status"
          />
        )}
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
                    setFile({ img: e.target.files[0] });
                  }}
                  accept="image/*"
                  type="file"
                  placeholder="Photo"
                  required
                />
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button
                  className="mr-2"
                  onClick={() => setOpen(false)}
                  size="lg"
                  variant="light"
                >
                  Close
                </Button>
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
