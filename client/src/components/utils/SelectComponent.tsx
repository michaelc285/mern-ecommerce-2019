import React, { useState } from "react";
import Select from "react-select";

const SelectComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  let options: object[] = [];
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: "1px dotted gray",
      backgroundColor: state.isSelected ? "gray" : "white",
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 50,
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  for (let i = 1; i < 100; i++) {
    options.push({ value: i, label: i });
  }

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      isSearchable={false}
    />
  );
};

export default SelectComponent;
