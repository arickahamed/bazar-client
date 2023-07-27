import React from "react";
import "../../style/CategoryForm.css";

const CategoryForm = ({handleSubmit, value, setValue}) => {
    
    
    return (
        <div className="category-form">
        <form className="form-item" onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Add New Category"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <button type="submit" class="btn btn-primary">
                Add
            </button>
        </form>
        </div>
    );
};

export default CategoryForm;
