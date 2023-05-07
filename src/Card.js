import { Link } from "react-router-dom";
const Card = ({
  id,
  title,
  description,
  category,
  skills,
  image,
  avgRating,
  price,
  numberOfReviews,
}) => {
  return (
    <>
      <div className="col-md-3 py-2">
        <div className="card">
          <Link to={`/gig/${id}`}>
            <img
              src={image}
              className="card-img-top"
              alt="alter"
              style={{ height: "150px", width: "253px" }}
            />
          </Link>
          <span>
            <span style={{ padding: "0 10px", fontWeight: "600" }}>
              {title}
            </span>
          </span>
          <div>
            <p
              style={{
                // fontFamily: "sans-sarif",
                padding: "0 10px",
                fontWeight: "500",
                height: "50px",
              }}
            >
              {description}
            </p>
          </div>
          <div>
            <span style={{ padding: "0 10px" }}>
              <i
                class="fa-sharp fa-solid fa-star"
                style={{ color: "orange" }}
              ></i>
            </span>
            <span style={{ color: "orange", marginLeft: "10px" }}>
              {avgRating}
            </span>
            <span style={{ color: "#b5b6ba" }}>({numberOfReviews})</span>
          </div>
          <hr />
          <span>
            <i
              style={{ padding: "0 10px", color: "#b5b6ba" }}
              class="fa-sharp fa-solid fa-heart"
            ></i>
            <span style={{ float: "right" }}>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#b5b6ba",
                  marginBottom: "0",
                }}
              >
                STARTING AT
              </p>
              <p
                style={{
                  marginBottom: "0px",
                  fontSize: "18px",
                  lineHeight: "20px",
                  color: "#404145",
                }}
              >
                PKR {price}
              </p>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};
export default Card;
