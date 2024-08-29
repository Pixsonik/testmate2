import React from "react";

const SemesterIcon = () => {
  const semesterLists = [
    { name: "Sem 1", image: "../assets/images/semIcon/sem.png" },
    { name: "Sem 2", image: "../assets/images/semIcon/sem.png" },
    { name: "Sem 3", image: "../assets/images/semIcon/sem.png" },
    { name: "Add Icon", image: "../assets/images/semIcon/add.png" },
  ];
  return (
    <>
      <div className="d-flex m-auto mt-5">
        <div className="col-12 row justify-content-around">
          {semesterLists.map((item, index) => (
            <>
              <div className="subject col-3 col-md-2 col-sm-2 col-lg-2 mb-5">
                <img
                  src={item.image}
                  alt="sem-img"
                  className="semImg mt-3"
                  key={index}
                  style={{ width: "100%", height: "auto " }}
                />
                <br />
                <h5 className="m-auto text-center">{item.name}</h5>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
export default SemesterIcon;
