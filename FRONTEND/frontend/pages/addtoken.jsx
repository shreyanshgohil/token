import React from "react";

const addtoken = () => {
  return (
    <div>
      <div>
        <div>
          <label htmlFor="">Token name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Token pirce</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="">Token total quantity</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="">Token available quantity</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="">type of token</label>
          <select name="" id="">
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default addtoken;
