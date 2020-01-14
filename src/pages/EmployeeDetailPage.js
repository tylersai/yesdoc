import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./EmployeeDetailPage.css";

import Axio from "axios";
import { API_ENDPOINT, getDefaultEmp } from "../utils/Constants";

const EmployeeDetailPage = ({ match }) => {
  const history = useHistory();
  const [emp, setEmp] = useState(getDefaultEmp());

  useEffect(() => {
    if (match.params.id) {
      Axio.get(API_ENDPOINT + `/employee/${match.params.id}`)
        .then(res => setEmp(res.data))
        .catch(error => {
          console.error(error);
          setEmp(getDefaultEmp());
        });
    } else {
      setEmp(getDefaultEmp());
    }
  }, [match.params.id]);

  const onEmpChange = e => {
    const newEmp = Object.assign({}, emp);
    newEmp[e.target.getAttribute("id")] = e.target.value;
    setEmp(newEmp);
  };

  const goSave = e => {
    e.preventDefault();
    Axio.post(API_ENDPOINT + '/employee', emp)
    .then(res => {
      alert('Saved!');
      history.push(`/employee/${res.data._id}`);
    })
    .catch(err => console.log(err));
  };

  const goUpdate = e => {
    e.preventDefault();
    Axio.patch(API_ENDPOINT + `/employee/${match.params.id}`, emp)
    .then(res => {
      alert('Updated!');
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="EmployeeDetailPage container py-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="float-right credits text-info animate-enlarge" id="credits">
            <span id="credit">${(emp.credits ? emp.credits:0.0).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="bg-light my-3 py-4 py-sm-5 px-3 px-sm-4 px-md-5 form-wrapper shadow animate-popup">
            <form onSubmit={match.params.id ? goUpdate:goSave}>
              <h3 className="text-center mb-3">Employee Information</h3>
              <div className="form-group">
                <label htmlFor="memberId">Member ID : </label>
                <input
                  type="text"
                  className="form-control font-weight-bold text-secondary"
                  id="memberId"
                  aria-describedby="memberIdHelp"
                  readOnly={match.params.id ? true : false}
                  disabled={match.params.id ? true : false}
                  value={emp.memberId}
                  required
                  onChange={onEmpChange}
                />
                <small id="memberIdHelp" className="form-text text-muted">
                  Once Employee Member ID is set, it can't be changed!
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name : </label>
                <input
                  type="text"
                  className="form-control text-info"
                  id="name"
                  aria-describedby="nameHelp"
                  value={emp.name}
                  required
                  onChange={onEmpChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth : </label>
                <input
                  type="date"
                  className="form-control text-info"
                  id="dateOfBirth"
                  aria-describedby="nameHelp"
                  value={emp.dateOfBirth}
                  onChange={onEmpChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employerName">Employer Name : </label>
                <input
                  type="text"
                  className="form-control text-info"
                  id="employerName"
                  aria-describedby="employerNameHelp"
                  value={emp.employerName}
                  onChange={onEmpChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address : </label>
                <textarea
                  className="form-control text-info"
                  id="address"
                  aria-describedby="addressHelp"
                  value={emp.address}
                  onChange={onEmpChange}
                />
              </div>
              <input type="submit" className="btn btn-info" value="Save" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
