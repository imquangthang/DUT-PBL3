import "./ModalViewCV.scss";
import { Button, Modal } from "react-bootstrap";
import ModalConfirmApply from "./ModalConfirmApply";
import { useState } from "react";
import { toast } from "react-toastify";

const ModalViewCV = (props) => {
  const { viewCV, viewCoverletter, idRecruitment, statusRecrutment } = props;

  const [action, setAction] = useState("");
  const [isShowModalConfirmApply, setIsShowModalConfirmApply] = useState(false);

  const handleCloseModalViewCV = () => {
    props.onHide();
  };

  const handleConfirmApply = async (action) => {
    if (+statusRecrutment === 0) {
      setAction(action);
      setIsShowModalConfirmApply(true);
    } else {
      toast.error("this Recruitment is resolved");
    }
  };

  const onHideModalConfirmApply = async () => {
    setIsShowModalConfirmApply(false);
    props.onHide();
  };

  return (
    <>
      <Modal
        size="xl"
        show={props.show}
        className="modal-job"
        onHide={() => handleCloseModalViewCV()}
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
                <div className="sortable-moves">
                  <h4>Cover Letter</h4>
                  <p>{viewCoverletter}</p>
                </div>
              </div>

              <div className="col-md-12">
                <div className="sortable-moves">
                  <h4>CV</h4>
                  <iframe
                    src={viewCV}
                    className="window-viewCV"
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modalViewCV-footer">
          <Button
            variant="success"
            onClick={() => handleConfirmApply("Accept")}
          >
            Accept
          </Button>
          <Button variant="danger" onClick={() => handleConfirmApply("Reject")}>
            Reject
          </Button>
          <Button variant="secondary" onClick={() => handleCloseModalViewCV()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalConfirmApply
        show={isShowModalConfirmApply}
        onHide={onHideModalConfirmApply}
        action={action}
        idRecruitment={idRecruitment}
      />
    </>
  );
};

export default ModalViewCV;
