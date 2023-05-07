import axios from "axios";
import EditGig from "./EditGig";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GigCreate from "./GigCreate";
import { Link } from "react-router-dom";
import Card from "./Card";
const Account = () => {
  const history = useHistory();
  let [gig, setGig] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:9002/myGigs", {
        headers: {
          "content-type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setGig(res.data.gigs);
      });
  }, []);

  const gigDel = (id) => {
    console.log("id : ", id);
    axios
      .delete(`http://localhost:9002/gigs?id=${id}`, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        let gigsData = [...gig];
        gigsData = gigsData.filter(({ _id }) => {
          return _id !== id;
        });
        setGig(gigsData);
      });
      
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {gig &&
            gig.map((items) => {
              console.log(items);
              return (
                <>
                  <Card
                    id={items._id}
                    title={items.title}
                    description={items.description}
                    category={items.category}
                    skills={items.skills}
                    image={items.image}
                    avgRating={items.avgRating}
                    price={items.price}
                    numberOfReveiws={items.numberOfReveiws}
                  />
                  <button
                    type="button"
                    class="btn btn-light "
                    style={{ height: "40px", width: "70px", margin: "3px" }}
                    onClick={() =>
                      history.push({
                        pathname: "/editgig",
                        state: items,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={() => {
                      gigDel(items._id);
                    }}
                    style={{ height: "40px", width: "70px", margin: "3px" }}
                  >
                    Delete
                  </button>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Account;
