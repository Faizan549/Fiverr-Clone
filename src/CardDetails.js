import React from "react";
const CardDetails = ({ gig, id, name, img }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <p style={{ fontSize: "30px", fontWeight: "bold", width :"700px" }}>{gig}</p>
          <img src={img} alt="" />
        </div>
        <div className="col-md-4">

        </div>
      </div>
    </div>
  );
};
export default CardDetails;
