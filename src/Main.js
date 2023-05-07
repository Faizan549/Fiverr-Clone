import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Data from "./Data";
import Nav from "./nav";
const Main = () => {
  let [gig, setGig] = useState([]);
  useEffect(() => {
    console.log(" main component called ");
    axios.get("http://localhost:9002/gigs").then((res) => {
      console.log(res.data);
      setGig(res.data.gig);
    });
  }, []);
  const [text, setText] = useState("");
  const changeHandler = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <input
            type="text"
            placeholder="Search Here"
            value={text}
            onChange={changeHandler}
            style={{ height: "50px", margin: "20px" }}
          />
          {gig
            .filter((value) => {
              if (value === "") {
                return value;
              } else if (
                value.title.toLowerCase().includes(text.toLowerCase())
              ) {
                return value;
              }
            })
            .map((items) => {
              console.log("items : ", items);
              return (
                <>
                  <Card
                    id={items.id}
                    title={items.title}
                    description={items.description}
                    category={items.category}
                    skills={items.skills}
                    image={items.image}
                    avgRating={items.avgRating}
                    price={items.price}
                    numberOfReviews={items.numberOfReviews}
                  />
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Main;
