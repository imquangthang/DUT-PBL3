import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  createNewJob,
  updateCurrentJob,
  getListCareer,
} from "../../services/jobService";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ModalNewCareer from "./ModalNewCareer";
import _ from "lodash";

const ModalJob = (props) => {
  const today = new Date();
  const isoString = today.toISOString();
  const dateOnly = isoString.split("T")[0];
  const { action, dataModalJob, company } = props;
  const [companyName, setCompanyName] = useState("");
  const [listCareer, setListCareer] = useState({});
  const defaultJobData = {
    title: "",
    companyId: "",
    careerId: "",
    address: "",
    numberEmployee: "",
    level: "",
    salary_min: "",
    salary_max: "",
    description: "",
    requirements: "",
    rights: "",
    deadline: "",
    sourcePicture: "",
  };

  const validInputsDefault = {
    title: true,
    companyId: true,
    careerId: true,
    address: true,
    numberEmployee: true,
    level: true,
    salary_min: true,
    salary_max: true,
    description: true,
    requirements: true,
    rights: true,
    deadline: true,
    sourcePicture: true,
  };

  const [JobData, setJobData] = useState(defaultJobData);
  const [validInputs, setValidInputs] = useState(validInputsDefault);

  const [showCareerInput, setShowCareerInput] = useState(false);

  useEffect(() => {
    if (action === "UPDATE") {
      setJobData(createRealData());
    }
  }, [dataModalJob]);

  useEffect(() => {
    if (action === "CREATE") {
      setJobData(createRealData());
    }
  }, [action]);

  const createRealData = () => {
    let str = dataModalJob.salary;
    let min, max;
    if (str) {
      let matches = str.match(/\d+/g); // Tìm tất cả các số trong chuỗi
      min = parseInt(matches[0]); // Số nhỏ nhất
      max = parseInt(matches[1]); // Số lớn nhất
    }
    let company_id;
    if (action === "UPDATE") {
      if (
        dataModalJob.Company &&
        dataModalJob.Company.id &&
        dataModalJob.Company.name
      ) {
        company_id = dataModalJob.Company.id;
        setCompanyName(dataModalJob.Company.name);
      }
    } else {
      if (company && company.id && company.name) {
        company_id = company.id;
        setCompanyName(company.name);
      }
    }

    let tmp_data = {
      id: dataModalJob.id,
      title: dataModalJob.title,
      companyId: company_id,
      careerId: dataModalJob.careerId,
      address: dataModalJob.address,
      numberEmployee: dataModalJob.numberEmployee,
      level: dataModalJob.level,
      salary_min: min,
      salary_max: max,
      description: dataModalJob.description,
      requirements: dataModalJob.requirements,
      rights: dataModalJob.rights,
      deadline: dataModalJob.deadline,
      sourcePicture: dataModalJob.sourcePicture,
    };
    return tmp_data;
  };

  const handleOnChangeInput = (value, name) => {
    if (value === "KHÁC") {
      setShowCareerInput(true);
    } else {
      setShowCareerInput(false);
    }
    let _JobData = _.cloneDeep(JobData);
    _JobData[name] = value;
    setJobData(_JobData);
  };

  const checkValidateInputs = () => {
    // create Job
    if (action === "UPDATE") return true;
    setValidInputs(validInputsDefault);
    let arr = [
      "title",
      "careerId",
      "address",
      "numberEmployee",
      "level",
      "salary_min",
      "salary_max",
      "description",
      "requirements",
      "rights",
      "deadline",
      "sourcePicture",
    ];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!JobData[arr[i]]) {
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

  const handleConfirmJob = async () => {
    // confirm Job
    let check = checkValidateInputs();
    if (check === true) {
      console.log("DateSub: " + dateOnly);
      let tmp_data = {
        id: JobData.id,
        title: JobData.title,
        companyId: JobData.companyId,
        careerId: JobData.careerId,
        address: JobData.address,
        numberEmployee: JobData.numberEmployee,
        level: JobData.level,
        salary: JobData.salary_min + " - " + JobData.salary_max + " Triệu",
        description: JobData.description,
        requirements: JobData.requirements,
        rights: JobData.rights,
        dateSub: dateOnly,
        deadline: JobData.deadline,
        sourcePicture: JobData.sourcePicture,
      };

      let res =
        action === "CREATE"
          ? await createNewJob({ ...tmp_data })
          : await updateCurrentJob({ ...tmp_data });
      if (res && res.EC === 0) {
        props.onHide();
        setJobData({ ...defaultJobData });
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
    setJobData(defaultJobData);
    setValidInputs(validInputsDefault);
    setCompanyName("");
  };

  const fetchCareer = async () => {
    let response = await getListCareer();
    if (response && response.EC === 0) {
      setListCareer(response.DT);
    }
  };

  useEffect(() => {
    fetchCareer();
    console.log(dataModalJob);
  }, [dataModalJob]);

  const onHideModalNewCareer = async () => {
    setShowCareerInput(false);
    await fetchCareer();
  };

  const setId = (id) => {
    console.log("New career id: " + id);
    setJobData((JobData) => ({
      ...JobData,
      careerId: id,
    }));
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
            <span>
              {props.action === "CREATE" ? "CREATE new Job" : "Edit a Job"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-12 form-group">
              <label>Title:</label>
              <input
                className={
                  validInputs.title ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={JobData.title}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "title")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Company Name:</label>
              <input
                disabled
                className="form-control"
                type="text"
                value={companyName}
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Career Name:</label>
              <select
                className={
                  validInputs.careerId
                    ? "form-select"
                    : "form-select is-invalid"
                }
                value={JobData.careerId}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "careerId")
                }
              >
                {listCareer && listCareer.length > 0 ? (
                  <>
                    {listCareer.map((item, index) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
                <option value="KHÁC">Khác</option>
              </select>
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
                value={JobData.address}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "address")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Number:</label>
              <input
                className={
                  validInputs.numberEmployee
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="number"
                value={JobData.numberEmployee}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "numberEmployee")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Level:</label>
              <input
                className={
                  validInputs.level ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={JobData.level}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "level")
                }
              />
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Salary:</label>
              <div className="d-flex align-items-center">
                <input
                  className={
                    validInputs.salary_min
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="number"
                  placeholder="Từ"
                  value={JobData.salary_min}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "salary_min")
                  }
                />
                <span className="mx-3">-</span>
                <input
                  className={
                    validInputs.salary_max
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="number"
                  placeholder="Đến"
                  value={JobData.salary_max}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "salary_max")
                  }
                />
                <span className="mx-3">Triệu</span>
              </div>
            </div>

            <div className="col-12 col-sm-6 form-group">
              <label>Deadline:</label>
              <input
                className={
                  validInputs.deadline
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="date"
                value={JobData.deadline}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "deadline")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Requirements:</label>
              <input
                className={
                  validInputs.requirements
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.requirements}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "requirements")
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
                value={JobData.description}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "description")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Rights:</label>
              <input
                className={
                  validInputs.requirements
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.rights}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "rights")
                }
              />
            </div>

            <div className="col-12 col-sm-12 form-group">
              <label>Image:</label>
              <input
                className={
                  validInputs.sourcePicture
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={JobData.sourcePicture}
                onChange={(event) =>
                  handleOnChangeInput(event.target.value, "sourcePicture")
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModalJob()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmJob()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>

      {showCareerInput && (
        <ModalNewCareer
          show={true}
          onHide={onHideModalNewCareer}
          setId={setId}
        />
      )}
    </>
  );
};

export default ModalJob;
