import React from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";

export default function UploadProdCover({ id, fetchProduct }) {
  const [ModalOpen, setModalOpen] = useState(false);
  const [File, setFile] = useState({ img: "" });
  const [Loading, setLoading] = useState(false);
  // IMAGE SEND
  const submitImg = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fileFormData = new FormData();
    fileFormData.append("image", File.img);

    try {
      let response = await fetch(
        `${process.env.REACT_APP_URLFETCHING}/products/${id}/uploadPhoto`,
        {
          method: "POST",
          body: fileFormData,
        }
      );
      if (response.ok) {
        setLoading(false);
        setModalOpen(false);
        fetchProduct(id);
        alert("Success!");
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   ====
  return (
    <>
      <Button
        className="mt-3"
        onClick={(e) => setModalOpen(!ModalOpen)}
        size="lg"
        variant="dark"
      >
        {" "}
        Upload Cover
      </Button>

      {/* UPLOAD MODAL */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={ModalOpen}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitImg}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                onClick={() => setModalOpen(false)}
                size="lg"
                variant="light"
              >
                Close
              </Button>
              <Button type="submit" size="lg" variant="dark">
                {Loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2 align-middle"
                  />
                )}
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
