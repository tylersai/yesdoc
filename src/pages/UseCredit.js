import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./UseCredit.css";

import Axio from "axios";
import { API_ENDPOINT } from "../utils/Constants";

const UseCredit = ({ match }) => {
  const history = useHistory();
  const [emp, setEmp] = useState({});
  const [amount, setAmount] = useState(0.0);

  useEffect(() => {
    if (match.params.id) {
      Axio.get(API_ENDPOINT + `/employee/${match.params.id}`)
        .then(res => {
          if (res.data._id) setEmp(res.data);
          else history.push("/employee");
        })
        .catch(error => {
          console.error(error);
          history.push("/employee");
        });
    } else {
      history.push("/employee");
    }
  }, [history, match.params.id]);

  const onAmtChange = e => setAmount(e.target.value);

  const goBack = e => {
    e.preventDefault();
    history.goBack();
  };

  const goUseCredit = e => {
    e.preventDefault();
    if (amount !== 0) {
      Axio.post(API_ENDPOINT + `/employee/transact/${emp._id}`, {
        amount: amount * (-1)
      })
        .then(res => {
          if (res.data.nModified > 0) {
            Axio.post(API_ENDPOINT + `/transaction/${emp._id}`, {
              amount: amount * (-1)
            })
              .then(res => {
                if (res.data._id) {
                  history.push(`/employee/${emp._id}`);
                } else {
                  alert("Failed to Add Transaction!");
                }
              })
              .catch(err => console.log(err));
          } else {
            alert("Failed to Update Credit!");
          }
        })
        .catch(err => console.log(err));
    } else {
      alert("Enter non-zero credit amount!");
    }
  };

  return (
    <div className="UseCredit container py-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="bg-light my-3 py-4 py-sm-5 px-3 px-sm-4 px-md-5 form-wrapper shadow animate-popup">
            <form onSubmit={goUseCredit}>
              <h3 className="text-center mb-3">Hi, {emp.name}</h3>
              <div className="form-group">
                <label htmlFor="amount">Amount : </label>
                <input
                  type="number"
                  className="form-control text-info"
                  id="amount"
                  aria-describedby="amountHelp"
                  value={amount}
                  required
                  onChange={onAmtChange}
                  step=".01"
                />
                <small id="memberIdHelp" className="form-text text-muted">
                  Enter credit amount you would like to use.
                </small>
              </div>
              <button onClick={goBack} className="btn btn-info">
                &larr; Go Back
              </button>
              <input
                type="submit"
                className="btn btn-info ml-2"
                value="Use Credit"
                disabled={!amount || amount === 0}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCredit;
