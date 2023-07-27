import React, { useState } from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import "../../style/Loader.css";

const override: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    margin: "0 auto",
    textAlign: "center"
  };

const Loader = () => {
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("rgb(104, 223, 157)")
  return (
    <div className='loader'>
        <PropagateLoader 
            color={color}
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            className='propagate-loader'
        />
    </div>
  )
}

export default Loader;