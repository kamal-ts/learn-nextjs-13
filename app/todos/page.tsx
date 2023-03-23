import AddTodos from "./addTodos";

type Todos = {
  id: string;
  todo: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

async function getTodos() {
  try {
    const res = await fetch("http://localhost:8000/todos", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return false;
  }
}

async function TodosList() {
  const todos = await getTodos();

  return (
    <div className="py-10 px-10">
      <div className="py-4">
      <AddTodos />
      </div>
      <div className="border border-slate-600 rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Todos</th>
              <th>Is Completed</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          {(!todos && (
            <tbody>
              <tr>
                <td>no data</td>
              </tr>
            </tbody>
          )) ||
            (todos && (
              <tbody>
                {todos.data.map((t: Todos, index: number) => (
                  <tr key={t.id}>
                    <td>{index + 1}</td>
                    <td>{t.todo}</td>
                    <td>{t.isCompleted ? "true" : "false"}</td>
                    <td>{t.createdAt}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}

export default TodosList;
