import React, { useState, useEffect } from "react";
import Data from "./Data";
import Card from "./Card";
import Navbar from "./component/Navbar";
const Home = () => {
  const [filteredItem, setfilteredItem] = useState(Data);
  const [data, setData] = useState("");
  useEffect(() => {
    let result = Data.filter((val) => {
      return val.gig.toLowerCase().includes(data.toLowerCase());
    });
    setfilteredItem(result);
  }, [data]);
  function handler(e) {
    setData(e.target.value);
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <input type="text" value={data} onChange={handler} />
      </div>
      <div className="container">
        <div className="row">
          {filteredItem.map((item) => {
            return (
              <Card
                name={item.Name}
                gig={item.gig}
                img={item.img}
                avgReview={item.avgReview}
                numberOfReview={item.numberOfReview}
                id={item.id}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
