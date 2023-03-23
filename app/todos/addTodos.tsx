"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

function AddTodos() {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState("");

  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }

  function handleClose() {
    setTitle("");
    setCompleted("");
    setModal(false);
  }

  async function createTodos(e: SyntheticEvent) {
    e.preventDefault();

    const isCompleted = completed === "true" ? true : false;

    await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: title,
        isCompleted: isCompleted,
      }),
    });
    setTitle("");
    setCompleted("");
    router.refresh();
    setModal(false);
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
          <form onSubmit={createTodos}>
            <div className="form-control">
              <label htmlFor="" className="label font-bold">
                Todos
              </label>
              <input
                value={title}
                type="text"
                className="input w-full input-bordered"
                placeholder="Todos"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="" className="label font-bold">
                Completed
              </label>
              <select
                value={completed}
                defaultValue={""}
                onChange={(e) => setCompleted(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value={""} disabled selected>
                  Is completed?
                </option>
                <option value={"true"}>yes</option>
                <option value={"false"}>no</option>
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleClose}>
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
