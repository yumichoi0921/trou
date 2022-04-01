import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import About from "./components/About";
import Check from "./components/plan/step3/Check";
import MyPage from "./components/myPage/MyPage";
import TripDetail from "./components/myPage/TripDetail";
import Main from "./components/main/Main";
import Login from "./components/FirstMain/Login";
import Join from "./components/FirstMain/Join";
import Plan from "./components/plan/Plan";
const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const plans = [
    {
      id: 1,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 2,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 3,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 4,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 5,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 6,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 7,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
    {
      id: 8,
      text: "서울",
      startDate: "2021-03-28",
      endDate: "2021-04-01",
    },
  ];

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert("Error Deleting This Task");
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const getPlanDetail = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
      <div className="header">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
      </div>
      <div className="container">
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/myPage/" element={<MyPage plans={plans} />} />
          <Route path="/tripDetail" element={<TripDetail />} />
          <Route path="/check" element={<Check />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
