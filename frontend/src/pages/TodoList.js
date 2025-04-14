import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const { token, logout } = useAuth();

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: 'Bearer ' + token }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Your To-Do List</h2>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>
      <TaskForm fetchTasks={fetchTasks} editing={editing} setEditing={setEditing} />
      <ul style={styles.list}>
        {tasks.map(task => (
          <li key={task._id} style={styles.item}>
            <span>{task.title} {task.completed ? "✅" : "❌"}</span>
            <div>
              <button onClick={() => setEditing(task)} style={styles.btn}>Edit</button>
              <button onClick={() => handleDelete(task._id)} style={styles.btn}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { maxWidth: 600, margin: '40px auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logout: { background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px' },
  list: { padding: 0, listStyle: 'none' },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    borderBottom: '1px solid #ccc'
  },
  btn: {
    marginLeft: 5,
    padding: '5px 10px',
    border: 'none',
    background: '#007BFF',
    color: '#fff'
  }
};
