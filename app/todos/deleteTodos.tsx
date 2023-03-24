"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Todos = {
    id: string;
    todo: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };

function DeleteTodos(props: Todos) {
  const [modal, setModal] = useState(false);
  const [isMutatingSubmit, setisMutatingSubmit] = useState(false);

  const router = useRouter();
  function handleChange() {
    setModal(!modal);
  }

  function handleClose() {
    setModal(false);
  }

  async function deleteTodo(id: string) {

    setisMutatingSubmit(true);

    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE"
    });
    setisMutatingSubmit(false);
    router.refresh();
    setModal(false);
  }

  return (
    <div>
      <button onClick={handleChange} className="btn btn-error btn-sm">
        Delete
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal ">
        <div className="modal-box">
          <h3 className="font-bold text-lg ">Are Sure to Delete {props.todo}?</h3>
         
            <div className="modal-action">
              <button className="btn" type="button" onClick={handleClose}>
                Close
              </button>
              {!isMutatingSubmit ? (
                <button className="btn btn-primary" type="submit" onClick={()=> deleteTodo(props.id)}>
                  Delete
                </button>
              ) : (
                <button className="btn loading" type="button">
                  Deleting...
                </button>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTodos;
