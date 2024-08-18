import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { updateCurrentCompany } from "../../services/companyService";

const ModalCompany = (props) => {
  const { dataModalCompany } = props;
  const defaultCompanyData = {
    id: "",
    name: "",
    address: "",
    description: "",
    headcount: "",
    avatar: "",
  };

  const validInputsDefault = {
    name: true,
    address: true,
    description: true,
    headcount: true,
    avatar: true,
  };

  const [CompanyData, setCompanyData] = useState(defaultCompanyData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);

  useEffect(() => {
    setCompanyData(createRealData(dataModalCompany));
  }, [dataModalCompany]);

  const createRealData = () => {
    let tmp_data = {
      id: dataModalCompany.id,
      name: dataModalCompany.name,
      address: dataModalCompany.address,
      description: dataModalCompany.description,
      headcount: dataModalCompany.headcount,
      avatar:
        dataModalCompany.User && dataModalCompany.User.avatar
          ? dataModalCompany.User.avatar
          : "",
    };

    return tmp_data;
  };

  const handleOnChangeInput = (value, name) => {
    let _JobData = _.cloneDeep(CompanyData);
    _JobData[name] = value;
    setCompanyData(_JobData);
  };

  const checkValidateInputs = () => {
    setValidInputs(validInputsDefault);
    let arr = ["name", "address", "description", "headcount", "avatar"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!CompanyData[arr[i]]) {
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        toast.error(`Empty input ${arr[i]}`);
        check = false;
        break;
      }
    }

    return check;
  };

  const handleConfirmCompany = async () => {
    // confirm Job
    let check = checkValidateInputs();
    if (check === true) {
      let res = await updateCurrentCompany({ ...CompanyData });
      if (res && res.EC === 0) {
        props.onHide();
        setCompanyData({ ...defaultCompanyData });
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
        toast.error(res.EM);
      }
    }
  };

  const handleCloseModalJob = () => {
    props.onHide();
    setCompanyData(defaultCompanyData);
    setValidInputs(validInputsDefault);
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="modal-job"
        onHide={() => handleCloseModalJob()}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>Edit Company</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-12 form-group">
              <label>Company Name:</label>
              <input
                className={
                  validInputs.name ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={CompanyData.name}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "name")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Address:</label>
              <input
                className={
                  validInputs.address
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={CompanyData.address}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "address")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Description:</label>
              <input
                className={
                  validInputs.description
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={CompanyData.description}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "description")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Headcount:</label>
              <input
                className={
                  validInputs.headcount
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={CompanyData.headcount}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "headcount")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Avatar:</label>
              <input
                className={
                  validInputs.avatar
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={CompanyData.avatar}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "avatar")
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalJob()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmCompany()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCompany;
