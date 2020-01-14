import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EmployeeListPage.css";

import Axio from "axios";
import { API_ENDPOINT } from "../utils/Constants";

const EmployeeListPage = () => {
  const [empList, setEmpList] = useState([]);

  const fetchEmpList = async () => {
    try {
      const res = await Axio.get(API_ENDPOINT + "/employee");
      setEmpList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmpList();
  });

  return (
    <div className="EmployeeListPage container py-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <h3 className="text-center mt-2 mb-4">List of Employees</h3>
          <div className="list-group">
            {empList.map(emp => (
              <Link
                key={emp._id}
                to={"/employee/" + emp._id}
                className="list-group-item list-group-item-light list-group-item-action animate-popup"
              >
                <h5>{emp.memberId}</h5>
                <h6>{emp.name}</h6>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeListPage;
