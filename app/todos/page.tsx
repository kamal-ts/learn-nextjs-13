type Todos = {
    id: string;
    todo: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
}

async function getTodos() {
    const res = await fetch('http://localhost:8000/todos')
    return res.json()
}

async function TodosList() {
    const todos = await getTodos()
    console.log(todos.data);
    
    return (
    <div className="py-10 px-10">
        <table className="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Todos</th>
                    <th>Is Completed</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {todos.data.map((t: Todos, index: number) => (
                    <tr key={t.id}>
                        <td>{index+1}</td>
                        <td>{t.todo}</td>
                        <td>{t.isCompleted ? "true" : "false"}</td>
                        <td>{t.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TodosList