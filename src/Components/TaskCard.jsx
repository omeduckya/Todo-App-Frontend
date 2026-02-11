export default function TaskCard({
  task,
  handleDeleteTask,
  handleChangeCompleted,
}) {
  return (
    <article className={`task-card ${task.completed ? "is-complete" : ""}`}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status ${task.completed ? "done" : "open"}`}>
          {task.completed ? "Done" : "Open"}
        </span>
      </div>
      <p className="task-description">{task.description || "No description"}</p>
      <div className="task-actions">
        <button
          className="task-button button-secondary"
          onClick={() => handleChangeCompleted(task._id)}
        >
          {task.completed ? "Mark as open" : "Mark as done"}
        </button>
        <button
          className="task-button button-danger"
          onClick={() => handleDeleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
