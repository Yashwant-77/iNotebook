import React, { useEffect, useState } from "react";

function ProfileInfo() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        setUser(json);
        console.log(json);
      } catch (error) {
        console.error(error.message);
      }
    };

    getUser();
  }, []);

  const handleEditDetailsClick = () => {
    alert("Service is currently not available");
  };

  return (
    <div>
      <div
        className="modal fade "
        id="Modal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="Modal2Label">
                User Details
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex">
                <p className="fw-bold">Name : &nbsp;</p>
                <p> {user.name}</p>
              </div>
              <div className="d-flex">
                <p className="fw-bold">Email : &nbsp;</p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleEditDetailsClick}
              >
                Edit Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
