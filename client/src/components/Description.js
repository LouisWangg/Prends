import React, { Fragment } from "react";
import "./Description.css";

const Description = ({ data, secondData }) => {
    const descriptionContent =
        data.sharedDescriptionId === 10 && secondData?.description
            ? secondData.description
            : data.description;

    return (
        <Fragment>
            <div className="descriptionText">
                <b>{data.title}</b>
                <p dangerouslySetInnerHTML={{ __html: descriptionContent }} />
            </div>
        </Fragment>
    );
};

export default Description;
