import React from "react";
import "./nav.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const Nav = ({ setLoginUser, user }) => {
  const history = useHistory();
  return (
    <div className="main1">
      <div className="container1">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="#">About Us</Link>
          </li>
          {!user && (
            <>
              <Link to={"/login"} className="btn">
                Login
              </Link>
              <Link to={"/register"} className="btn">
                Register
              </Link>
            </>
          )}
          {user && (
            <Link
              to={"/"}
              className="btn"
              style={{ display: "none" }}
              onClick={() => {
                localStorage.setItem("token", "");
                setLoginUser("");
              }}
            >
              Logout
            </Link>
          )}
          {user && (
            <Link to={"/creategig"} className="btn">
              {" "}
              Create Gig
            </Link>
          )}
          {user && (
            <div class="dropdown show">
              <a
                class="btn dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa-solid fa-user"> </i>
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  class="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.setItem("token", "");
                    setLoginUser("");
                    history.push("/");
                  }}
                >
                  Logout
                </a>
                <a
                  class="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push("/account");
                  }}
                >
                  Account
                </a>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};



export default Nav;

