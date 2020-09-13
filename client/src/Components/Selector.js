import React from "react";

export default function Selector({currentPeriod, periods, periodChanged}) {

    const handleChange = ({target})=>{
        periodChanged(target.value);
    }

  return (
    <div>
      <label>
        Select the period
        <select
          className="browser-default"
          value={currentPeriod}
          onChange={handleChange}
        >
          {periods.map((p, i) => {
            return (
              <option key={i} value={p}>
                {p}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
