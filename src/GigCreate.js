import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import "./GigCreate.css";
const GigCreate = () => {
  let location = useLocation();
  // console.log("location : ", location.state);
  let history = useHistory();
  let [gig, setGig] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    image: "",
    avgRating: 0,
    price: 0,
    numberOfReviews: 0,
  });

  console.log("gig : ", gig);

  function Handler(e) {
    let { name, value } = e.target;
    console.log(e.target.value);
    console.log(e.target);
    setGig({
      ...gig,
      [name]: value,
    });
  }

  function saveData() {
    axios
      .post("http://localhost:9002/gigs", gig, {
        headers: {
          "content-type": "application/json",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
      });
    history.push("/");
  }

  const checkBoxChangeHandler = (e, label) => {
    const { skills } = gig;
    const { checked } = e.target;
    if (checked) {
      setGig({ ...gig, skills: [...skills, label] });
    } else {
      let skillsData = skills;
      skillsData = skillsData.filter((item) => {
        return item !== label;
      });
      setGig({ ...gig, skills: [...skillsData] });
    }
  };
  return (
    <>
      <div className="container">
        <h3 className="text-center">Add Gigs</h3>
        <div className="row">
          <div className="col-md-6 form-group">
            <label for="exampleInputEmail1">Tittle</label>
            <input
              type="text"
              class="form-control"
              onChange={Handler}
              name="title"
              maxLength="20"
              value={gig.title}
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label for="exampleInputEmail1">Description</label>
            <input
              type="text"
              class="form-control"
              maxLength="50"
              onChange={Handler}
              name="description"
              value={gig.description}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label class="form-check-label">Category</label>
            <div>
              {[
                { label: "Graphic Design", value: 1 },
                { label: "Web Development", value: 2 },
              ].map(({ label, value }) => {
                return (
                  <p>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={"category"}
                      value={label}
                      onChange={Handler}
                    />
                    <label for="editing">{label}</label>
                  </p>
                );
              })}
            </div>
          </div>
          <div className="col-md-6">
            <label class="form-check-label">Skills</label>
            <div className="form-check">
              {[
                {
                  label: "react",
                  value: 1,
                },
                {
                  label: "node",
                  value: 2,
                },
                {
                  label: "javascript",
                  value: 3,
                },
              ].map(({ label, value }) => {
                return (
                  <p>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="skill"
                      id={value}
                      onChange={(e) => {
                        checkBoxChangeHandler(e, label);
                      }}
                      value={label}
                    />
                    <label for="react-js" className="form-check-label">
                      {label}
                    </label>
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label for="exampleInputEmail1">Image</label>
            <input
              name="image"
              type="text"
              class="form-control"
              onChange={Handler}
              value={gig.image}
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label for="exampleInputEmail1">Average Rating</label>
            <input
              type="number"
              class="form-control"
              onChange={Handler}
              name="avgRating"
              value={gig.rating}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 form-group">
            <label for="exampleInputEmail1">Price</label>
            <input
              type="number"
              class="form-control"
              onChange={Handler}
              name="price"
              value={gig.price}
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label for="exampleInputEmail1">Number of Reviews</label>
            <input
              type="number"
              class="form-control"
              onChange={Handler}
              name="numberOfReviews"
              value={gig.numberOfReviews}
            ></input>
          </div>
        </div>
        <button type="submit" onClick={saveData} className="btn btn-primary">
          Submit
        </button>
      </div>
    </>
  );
};

export default GigCreate;
