"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

type Todos = {
    id: string;
    todo: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };


function UpdateTodos(props: Todos) {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(props.todo);
  const [completed, setCompleted] = useState(String(props.isCompleted));

  const [isMutatingSubmit, setisMutatingSubmit] = useState(false);

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

    setisMutatingSubmit(true);
    const isCompleted = completed === "true" ? true : false;

    await fetch(`http://localhost:8000/todos/${props.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: title,
        isCompleted: isCompleted,
      }),
    });
    setisMutatingSubmit(false);

    setTitle("");
    setCompleted("");
    router.refresh();
    setModal(false);
  }

  return (
    <div>
      <button onClick={handleChange} className="btn btn-success btn-sm">
        Update
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal ">
        <div className="modal-box">
          <h3 className="font-bold text-lg ">Update Todos</h3>
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
                onChange={(e) => setCompleted(e.target.value)}
                className="select select-bordered w-full"
                value={completed}
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
              {!isMutatingSubmit ? (
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              ) : (
                <button className="btn loading" type="button">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTodos;
