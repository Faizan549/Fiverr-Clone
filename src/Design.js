import React, { useEffect, useState } from "react";
import Data from "./Data";
import CardDetails from "./CardDetails";
const Design = () => {
  let [gigDetails, setgigDetails] = useState("");
  useEffect(() => {
    let id = window.location.pathname.split("/")[2];
    let requiredData = Data.find((item) => {
      return item.id === parseInt(id);
    });
    setgigDetails(requiredData);
  });
  return (
    <div>
      {gigDetails && (
        <CardDetails
          name={gigDetails.Name}
          img={gigDetails.img}
          id={gigDetails.id}
          gig={gigDetails.gig}
        />
      )}
    </div>
  );
};
export default Design;
