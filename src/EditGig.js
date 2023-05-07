import React from "react";
import axios from "axios";
import "./EditGig.css";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
const EditGig = () => {
  let location = useLocation();
  let history = useHistory();
  let [gig, setGig] = useState({
    title: location.state.title,
    description: location.state.description,
    category: location.state.category,
    skills: location.state.skills,
    image: location.state.image,
    avgRating: location.state.avgRating,
    price: location.state.price,
    numberOfReviews: location.state.numberOfReviews,
  });
  console.log(location.state);
  function save() {
    axios
      .put(
        `http://localhost:9002/gigs?_id=${location.state._id}&name=faizna&email=pak@gmail.com&categy=pop`,
        gig
      )
      .then((res) => {
        history.push("/account");
      });
  }
  function Handler(e) {
    let { name, value } = e.target;
    console.log(e.target.value);
    console.log(e.target);
    setGig({
      ...gig,
      [name]: value,
    });
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
              value={gig.title}
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label for="exampleInputEmail1">Description</label>
            <input
              type="text"
              class="form-control"
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
                      checked={gig.category.includes(label)}
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
                      checked={gig.skills.includes(label)}
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
              value={gig.avgRating}
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
        <button type="submit" className="btn btn-primary" onClick={save}>
          Save
        </button>
      </div>
    </>
  );
};

export default EditGig;
