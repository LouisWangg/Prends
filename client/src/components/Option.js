import React from "react";

import "./Option.css";

const Option = ({ title, name, selected, options, onChange, labelMapper }) => {
  return (
    <fieldset className="optionFieldSet">
      <legend className="optionLegend">{title}</legend>
      {options &&
        Object.entries(options).map(([key, value]) => (
          <label
            key={key}
            className={`optionLabel ${selected === key ? "activeMode" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={key}
              checked={selected === key}
              onChange={onChange}
              className="optionRadio"
            />
            {labelMapper ? labelMapper(key) : key}
          </label>
        ))}
    </fieldset>
  );
};

export default Option;
