import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./TransHistory.css";

import Axio from "axios";
import { API_ENDPOINT } from "../utils/Constants";
import Loading from "../components/Loading";
import NoData from "../components/NoData";

const TransHistory = ({match}) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [transList, setTransList] = useState([]);
  const [emp, setEmp] = useState({});

  const fetchTransList = async () => {
    try {
      const res = await Axio.get(API_ENDPOINT + `/transaction/${match.params.id}`);
      setTransList(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setTransList([]);
      setIsLoading(false);
    }
  };

  const fetchEmp = async () => {
    try {
      const res = await Axio.get(API_ENDPOINT + `/employee/${match.params.id}`);
      setEmp(res.data);
    } catch (error) {
      console.error(error);
      setEmp({});
    }
  };

  useEffect(() => {
    fetchEmp();
    fetchTransList();
  }, [match.params.id]);

  return (
    <div className="TransHistory container py-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <h3 className="text-center mt-2 mb-4 animate-enlarge">Transaction History</h3>
          <div className="row">
            <div className="col">
              <button onClick={history.goBack} className="btn btn-info mb-3 animate-enlarge">&larr; Go Back</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h5 className="text-left animate-popup">Member ID : <span className="memberId">{emp.memberId}</span></h5>
              <h5 className="text-left animate-popup mb-4">Name : <span className="text-info">{emp.name}</span></h5>
            </div>
          </div>
          <div className="row">
            <div className="col">
              { isLoading ? <div className="d-flex justify-content-center animate-popup"><Loading/></div>:transList.length > 0 ? (<div className="list-group">
                {transList.map(trans => (
                  <button
                    key={trans._id}
                    className={"list-group-item animate-popup list-group-item-" + (+trans.amount>0 ? "success":"danger")}
                  >
                    <h5 className="text-left">$ {(+trans.amount).toFixed(2)}</h5>
                    <h6 className="datetime">{new Date(trans.datetime).toLocaleString("en-US", {
                      year: "2-digit",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true
                    })}</h6>
                  </button>
                ))}
              </div>):<NoData desc="No Transaction History"/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransHistory;
