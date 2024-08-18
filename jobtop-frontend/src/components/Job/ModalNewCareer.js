import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { addNewCareer, getNewCareerId } from "../../services/jobService";
import { toast } from "react-toastify";

const ModalNewCareer = (props) => {
  const [careerName, setCareerName] = useState("");
  const [careerId, setCareerId] = useState("");

  const handleCloseModalNewCareer = () => {
    props.onHide();
  };

  const handleConfirmNewCareer = async () => {
    if (careerName) {
      let data = {
        name: careerName,
      };
      let response = await addNewCareer(data);
      console.log(">>Check response: ", response);
      if (response && response.EC === 0) {
        toast.success(response.EM);
        setCareerId(response.DT.id);
        handleCloseModalNewCareer();
      } else {
        toast.error(response.EM);
      }
    } else {
      toast.error("Enter career name");
    }
  };

  useEffect(() => {
    props.setId(careerId);
  }, [careerId]);

  return (
    <>
      <Modal
        size="sm"
        show={props.show}
        className="modal-new-career bg-dark bg-opacity-50"
        onHide={() => handleCloseModalNewCareer()}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>Add new career</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-12 col-sm-12 form-group">
            <label>Name Career:</label>
            <input
              className={
                careerName ? "form-control" : "form-control is-invalid"
              }
              type="text"
              value={careerName}
              onChange={(event) => setCareerName(event.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => handleCloseModalNewCareer()}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmNewCareer()}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNewCareer;
