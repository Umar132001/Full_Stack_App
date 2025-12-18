import React from "react";

const Select = ({ value, onChange, options, ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    >
      <option value="">Select Tag</option>
      {options && options.length > 0 ? (
        options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))
      ) : (
        <option disabled>No tags available</option>
      )}
    </select>
  );
};

export default Select;
