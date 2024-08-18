import "./ModalConfirmApply.scss";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  rejectRecruitment,
  acceptRecruitment,
} from "../../services/companyService";
import { toast } from "react-toastify";
import { Rings } from "react-loader-spinner";

const ModalConfirmApply = (props) => {
  const { action, idRecruitment } = props;
  const [timeInterview, setTimeInterview] = useState("");
  const [dayInterview, setDayInterview] = useState("");
  const [address, setAddress] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCloseModalConfirmApply = () => {
    props.onHide();
    setDayInterview("");
    setTimeInterview("");
    setAddress("");
  };

  const handleReject = async () => {
    setLoading(true);
    let data = { action, idRecruitment };
    let response = await rejectRecruitment(data);
    if (response && response.EC === 0) {
      handleCloseModalConfirmApply();
      toast.success(response.EM);
    } else {
      toast.error(response.EM);
    }
    setLoading(false);
  };

  const handleAccept = async () => {
    setLoading(true);
    if (timeInterview && dayInterview && address) {
      let data = {
        action,
        idRecruitment,
        dayInterview,
        timeInterview,
        address,
        interviewer,
        phone,
      };
      let response = await acceptRecruitment(data);
      if (response && response.EC === 0) {
        handleCloseModalConfirmApply();
        toast.success(response.EM);
      } else {
        toast.error(response.EM);
      }
    } else {
      toast.error("Enter time Interview and address");
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <>
      <>
        {" "}
        <Modal
          size="sm"
          show={props.show}
          className="bg-dark bg-opacity-50"
          onHide={() => handleCloseModalConfirmApply()}
          backdrop="static"
          centered
        >
          {loading ? (
            <div className="loading-container">
              <Rings width={100} height={100} color="#1877f2" />
              <div>Waiting...</div>
            </div>
          ) : (
            <>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  <span>{action} Recruitment</span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {action && action === "Accept" ? (
                  <>
                    <div className="content-body row">
                      <div className="col-12 col-sm-12 form-group">
                        <label>Day Interview:</label>
                        <input
                          className={
                            dayInterview
                              ? "form-control"
                              : "form-control is-invalid"
                          }
                          type="date"
                          onChange={(event) =>
                            setDayInterview(event.target.value)
                          }
                        />
                      </div>

                      <div className="col-12 col-sm-12 form-group">
                        <label>Time Interview:</label>
                        <input
                          className={
                            timeInterview
                              ? "form-control"
                              : "form-control is-invalid"
                          }
                          type="time"
                          onChange={(event) =>
                            setTimeInterview(event.target.value)
                          }
                        />
                      </div>

                      <div className="col-12 col-sm-12 form-group">
                        <label>Address:</label>
                        <input
                          className={
                            address ? "form-control" : "form-control is-invalid"
                          }
                          type="text"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                        />
                      </div>

                      <div className="col-12 col-sm-12 form-group">
                        <label>Interviewer:</label>
                        <input
                          className={
                            interviewer
                              ? "form-control"
                              : "form-control is-invalid"
                          }
                          type="text"
                          value={interviewer}
                          onChange={(event) =>
                            setInterviewer(event.target.value)
                          }
                        />
                      </div>

                      <div className="col-12 col-sm-12 form-group">
                        <label>Phone:</label>
                        <input
                          className={
                            phone ? "form-control" : "form-control is-invalid"
                          }
                          type="number"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p>Bạn có chắc chắn hủy Recruitment này?</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer className="modalConfirm-footer">
                {action && action === "Accept" ? (
                  <>
                    <Button variant="success" onClick={() => handleAccept()}>
                      Gửi Mail
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="danger" onClick={() => handleReject()}>
                      Reject
                    </Button>
                  </>
                )}

                <Button
                  variant="secondary"
                  onClick={() => handleCloseModalConfirmApply()}
                >
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </>
    </>
  );
};

export default ModalConfirmApply;
