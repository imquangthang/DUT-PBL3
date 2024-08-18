// CVForm.js
import React, { useState } from "react";
import CVTemplate from "./CVTemplate";
import { PDFViewer } from "@react-pdf/renderer";

const CVForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [showCV, setShowCV] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split("/");
    setSkills(skillsArray);
  };

  const handleEducationChange = (e) => {
    const educationArray = e.target.value.split("/");
    setEducation(educationArray);
  };

  const handleExperienceChange = (e) => {
    const experienceArray = e.target.value.split("/");
    setExperience(experienceArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowCV(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Họ và tên:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />
        <label>
          Nghề nghiệp ứng tuyển:
          <input type="text" value={jobTitle} onChange={handleJobTitleChange} />
        </label>
        <br />
        <label>
          About Me:
          <textarea value={aboutMe} onChange={handleAboutMeChange} />
        </label>
        <br />
        <label>
          Kỹ năng (phân cách bằng /):
          <textarea type="text" value={skills} onChange={handleSkillsChange} />
        </label>
        <br />
        <label>
          Học vấn (phân cách bằng /):
          <textarea
            type="text"
            value={education}
            onChange={handleEducationChange}
          />
        </label>
        <br />
        <label>
          Kinh nghiệm làm việc (phân cách bằng /):
          <textarea
            type="text"
            value={experience}
            onChange={handleExperienceChange}
          />
        </label>
        <br />
        <label>
          Ảnh:
          <input
            type="file"
            onChange={(e) =>
              setImageSrc(URL.createObjectURL(e.target.files[0]))
            }
          />
        </label>
        <br />
        <button type="submit">Tạo CV</button>
      </form>
      {showCV && (
        <div style={{ marginTop: "20px" }}>
          <PDFViewer width="1000" height="600">
            <CVTemplate
              name={name}
              jobTitle={jobTitle}
              email={email}
              phone={phone}
              aboutMe={aboutMe}
              skills={skills}
              education={education}
              experience={experience}
              imageSrc={imageSrc}
            />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default CVForm;
