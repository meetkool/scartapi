import { useState } from "react";

const useFilter = () => {
  const [filter, setFilter] = useState({});

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    setFilter((prevFilter) => {
      let updatedFilter;
      if (type === 'checkbox') {
        if (prevFilter[name] && prevFilter[name].length) {
          if (prevFilter[name].includes(value)) {
            const newFilterValues = prevFilter[name].filter((v) => v !== value);
            if (newFilterValues.length > 0) {
              updatedFilter = {
                ...prevFilter,
                [name]: newFilterValues,
              };
            } else {
              const { [name]: deletedKey, ...remaining } = prevFilter;
              updatedFilter = remaining;
            }
          } else {
            updatedFilter = {
              ...prevFilter,
              [name]: [...prevFilter[name], value],
            };
          }
        } else {
          updatedFilter = {
            ...prevFilter,
            [name]: [value],
          };
        }
      } else if (type === 'number') {
        updatedFilter = {
          ...prevFilter,
          [name]: parseFloat(value),
        };
      } else {
        updatedFilter = {
          ...prevFilter,
          [name]: value,
        };
      }
      return updatedFilter;
    });
  };

  const handleResetFilters = () => {
    setFilter({});
  };

  return { filter, handleFilterChange, handleResetFilters };
};

export default useFilter;
