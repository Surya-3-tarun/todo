import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function TaskForm({ fetchTasks, editing, setEditing }) {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setCompleted(editing.completed);
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, completed };
    const headers = { Authorization: 'Bearer ' + token };

    if (editing) {
      await axios.put(`http://localhost:5000/api/tasks/${editing._id}`, payload, { headers });
      setEditing(null);
    } else {
      await axios.post('http://localhost:5000/api/tasks', payload, { headers });
    }

    setTitle('');
    setCompleted(false);
    fetchTasks();
  };

  return (
   // inside return()
<form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" style={{ flex: 1, padding: 10 }} />
  <label style={{ display: 'flex', alignItems: 'center' }}>
    <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
    <span style={{ marginLeft: 5 }}>Done</span>
  </label>
  <button type="submit" style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none' }}>
    {editing ? "Update" : "Add"}
  </button>
</form>

  );
}
