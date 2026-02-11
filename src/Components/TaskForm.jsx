export default function TaskForm({ task, handleChange, handleOnSubmit }) {
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button className="task-button button-secondary" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}
