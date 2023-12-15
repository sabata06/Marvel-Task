import React from "react";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
  return (
<div className="d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h1 className="display-1 fw-bold text-white">404</h1>
            <p className="fs-3 text-white">
              <span className="text-danger">Opps!</span> Network Error.
            </p>
            <p className="lead text-white">The page you’re looking for doesn’t exist.</p>
            <Link to={"/"} className="btn btn-danger">
              Go Home
            </Link>
          </div>
        </div> 
  );
};

export default ErrorComponent;
