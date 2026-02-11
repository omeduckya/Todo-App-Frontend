import TaskCard from "./TaskCard";

export default function TasksContainer({
  tasks,
  handleDeleteTask,
  handleChangeCompleted,
}) {
  if (!tasks.length) {
    return <p className="empty-tasks">No tasks yet. Add your first one above.</p>;
  }

  return (
    <section className="tasks-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          handleDeleteTask={handleDeleteTask}
          handleChangeCompleted={handleChangeCompleted}
        />
      ))}
    </section>
  );
}
