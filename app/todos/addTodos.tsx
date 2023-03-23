"use client";

import { useState } from "react";

function AddTodos() {
  const [modal, setModal] = useState(false);
  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button onClick={handleChange} className="btn">
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal ">
        <div className="modal-box">
          <h3 className="font-bold text-lg ">Add New Todos</h3>
          <form action="">
            <div className="form-control">
              <label htmlFor="" className="label font-bold">
                Todos
              </label>
              <input
                type="text"
                className="input w-full input-bordered"
                placeholder="Todos"
              />
            </div>
            <div className="form-control">
              <label htmlFor="" className="label font-bold">
                Completed
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Is completed?
                </option>
                <option value={1}>yes</option>
                <option value={0}>no</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleChange}>
                Close
              </button>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTodos;
