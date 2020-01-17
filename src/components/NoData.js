import React from "react";
import "./NoData.css";
import nodata from "../assets/no-data.svg";

const NoData = ({desc}) => {
  return (
    <div className="NoData d-flex justify-content-center my-5">
      <div>
          <img src={nodata} alt="No Data"/>
          <h5 className="text-center text-gray letter-spacing">{desc ? desc:"No Data"}</h5>
      </div>
    </div>
  );
};

export default NoData;