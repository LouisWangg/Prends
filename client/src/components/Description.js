import React, { Fragment } from "react";
import "./Description.css";

const Description = ({ data }) => {
    return (
        <Fragment>
            <div className="descriptionText">
                <b>{data.title}</b>
                <p>{data.description}</p>
            </div>
        </Fragment>
    );
};

export default Description;
