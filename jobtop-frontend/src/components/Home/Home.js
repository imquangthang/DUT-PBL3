import "./Home.scss";
import Job from "../Job/Job";

const Home = (props) => {
  return (
    <>
      <div className="container">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-size">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://www.pace.edu.vn/uploads/news/2023/12/5-cac-yeu-to-trong-moi-truong-vi-mo.jpg"
                  className="h-100 w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item ">
                <img
                  src="https://www.pace.edu.vn/uploads/news/2023/12/1-moi-truong-vi-mo-la-gi.jpg"
                  className="h-100 w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://www.pace.edu.vn/uploads/news/2023/12/3-tac-dong-cua-moi-truong-vi-mo.jpg"
                  className="h-100 w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div class="my-3">
          <h2>Công việc hiện hành</h2>
        </div>
        <Job />
      </div>
    </>
  );
};

export default Home;
