import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addResult } from "../../redux/reducer/searchSlice";

const SearchInput = () => {
    const navigate = useNavigate();
    const [target, setTarget] = useState();
    const dispatch = useDispatch();
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/app/v1/product/search/${target}`);
            dispatch(addResult(data));
            navigate(`/search/${target}`);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="form-control me-2"
                    placeholder="Search"
                    aria-label="Search"
                    value={target}
                    onChange={(e)=> setTarget(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
