import React from "react";
import { FiUser } from "react-icons/fi";
import { HiStar } from "react-icons/hi";

import "./CommentSection.css";

const CommentSection = ({ data }) => {
    // Determine which rating (1-5) is marked as 1
    const starCount = (() => {
        const ratingMap = {
            ratingOne: 1,
            ratingTwo: 2,
            ratingThree: 3,
            ratingFour: 4,
            ratingFive: 5,
        };
        for (const key in ratingMap) {
            if (data[key] === 1 || data[key] === "1") {
                return ratingMap[key];
            }
        }
        return 0;
    })();

    return (
        <div className="commentWrapper">
            <div className="starAndDateWrapper">
                <div className="stars">
                    {Array.from({ length: 5 }).map((_, i) =>
                        i < starCount ? (
                            <HiStar key={i} className="starSize" />
                        ) : ({})
                        // (
                        //     <HiOutlineStar key={i} className="starSize" />
                        // )
                    )}
                </div>
                <span>{data.createdAtFormatted}</span>
            </div>
            <div className="identityWrapper">
                <FiUser className="commentUserIcon" />
                <span>{data?.User?.fullName || "Anonim"}</span>
            </div>
            <div className="contentWrapper">
                <p><b>{data.title}</b></p>
                <p>{data.description}</p>
            </div>
            <hr className="detailPageLine" />
        </div>
    );
};

export default CommentSection;
