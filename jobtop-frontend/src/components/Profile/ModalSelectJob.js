import "./ModalSelectJob.scss";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ModalSelectJob = (props) => {
  const {
    name,
    email,
    phone,
    aboutMe,
    skills,
    education,
    experience,
    imageSrc,
  } = props;

  const [jobTitle, setJobTitle] = useState("");

  const handleCloseModalSelectJob = () => {
    props.onHide();
  };

  useEffect(()=>{
  })

  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        className="modal-job"
        onHide={() => handleCloseModalSelectJob()}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>View Recruitment</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div className="row gap-3">
              <div className="col-md-12">
                <label for="job-recruitment" class="form-label">
                  Nhập Công Việc:
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">
            <div className="accept">
              <Link
                to={{
                  pathname: "/CV-Template",
                  state: {
                    name,
                    jobTitle,
                    email,
                    phone,
                    aboutMe,
                    skills,
                    education,
                    experience,
                    imageSrc,
                  },
                }}
              >
                <>Accept</>
              </Link>
            </div>
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleCloseModalSelectJob()}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSelectJob;
