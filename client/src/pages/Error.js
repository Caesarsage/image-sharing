import React from 'react'
import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <div className="container text-center"style={{marginTop:"12em"}}>
      <h1 className="text-bold">
        4 <span className="text-danger">0</span> 4
      </h1>
      <p>
        Page Not Found!!!
      </p>
      <Link to="/" className="btn btn-sm btn-primary mb-4">RETURN HOME</Link>
    </div>
  );
}
