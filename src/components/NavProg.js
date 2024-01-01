import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./navprog.css";

export default function NavProg() {
  const [showTaskPad, setShowTaskPad] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [userTasks, setUserTasks] = useState([]);
  // const [streak, setStreak] = useState(0);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the Leaderboard page
    navigate("/Leaderboard");
  };

  // Fetch user ID from cookies and initialize selectedProgram from local storage
  const userIdFromCookies = Cookies.get("userId");
  const selectedProgramFromStorage = localStorage.getItem("selectedProgram");

  // Function to handle task submission
  const handleTaskSubmit = () => {
    // Check if taskText is not empty before submitting
    if (taskText.trim() === "") {
      // You can provide some feedback to the user about an empty task
      alert("Please enter something before submitting.");
      return;
    }

    // Get the current date and time in ISO format (YYYY-MM-DD HH:MM:SS)
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Prepare the data to send to the backend
    const dataToSend = {
      userId: userIdFromCookies,
      selectedProgram: selectedProgramFromStorage,
      taskText,
      datetime: currentDate,
    };

    // Make an HTTP POST request to your backend API to submit the task
    fetch(
      "http://ec2-43-204-107-124.ap-south-1.compute.amazonaws.com:5000/api/submitTask",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("Task submitted successfully");
          // Refresh the user's task list after submission
          fetchUserTasks();
          // Calculate the streak
          // calculateStreak(userTasks, currentDate);
        } else {
          console.error("Task submission failed");
        }
      })
      .catch((error) => {
        console.error("Error submitting task: " + error.message);
      });

    // Clear the task text and hide the task pad
    setTaskText("");
  };

  const handleTaskDelete = async () => {
    try {
      // Make an HTTP DELETE request to your backend API to delete the last submitted task
      const response = await fetch(
        "http://ec2-43-204-107-124.ap-south-1.compute.amazonaws.com:5000/api/deleteLastTask",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Last task deleted successfully");
        // Refresh the user's task list after deletion
        fetchUserTasks();
        // Calculate the streak (if needed)
        // calculateStreak(userTasks, currentDate);
      } else {
        console.error("Last task deletion failed");
      }
    } catch (error) {
      console.error("Error deleting last task: " + error.message);
    }
  };

  // const calculateStreak = (tasks, currentDate) => {
  //   // Initialize the streak to 1 if there are no tasks yet
  //   if (tasks.length === 0) {
  //     setStreak(1);
  //     return;
  //   } else {
  //     const lastTask = tasks[tasks.length - 1];
  //     const lastTaskDate = new Date(lastTask.datetime);
  //     const currentTaskDate = new Date(currentDate);
  //     const timeDifference = (currentTaskDate - lastTaskDate) / 1000; // Convert to seconds

  //     console.log("time diffeerence " + timeDifference);
  //     if (timeDifference <= 50000) {
  //       // Task was submitted within 5 seconds of the previous task, increment streak
  //       console.log("hello");
  //       setStreak((prevStreak) => prevStreak + 1);
  //     } else {
  //       // Tasks are not in streak, reset streak to 1
  //       setStreak(0);
  //     }
  //   }
  // };

  const toggleTaskPad = () => {
    setShowTaskPad(!showTaskPad);
  };

  const handleTaskInputChange = (e) => {
    setTaskText(e.target.value);
  };

  // Function to format the date as "October 10, 2022"
  // Function to format the date as "October 10, 2022"
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to fetch user's tasks
  const fetchUserTasks = async () => {
    try {
      const response = await fetch(
        `http://ec2-43-204-107-124.ap-south-1.compute.amazonaws.com:5000/api/userTasks?userId=${userIdFromCookies}&programId=${selectedProgramFromStorage}`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        // Format the datetime in each task
        const formattedData = data.map((task) => ({
          ...task,
          datetime: formatDate(task.datetime),
        }));
        setUserTasks(formattedData);
      } else {
        console.error("Error fetching user tasks");
      }
    } catch (error) {
      console.error("Error fetching user tasks: " + error.message);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     fetchUserTasks();
  //     const currentDate = new Date()
  //       .toISOString()
  //       .slice(0, 19)
  //       .replace("T", " ");
  //     // calculateStreak(userTasks, currentDate);
  //   };
  // }, []);

  return (
    <div className="task-container">
      <button className="taskPadButton" onClick={toggleTaskPad}>
        Task Pad
      </button>
      <button
        className="taskPadButton"
        style={{ marginLeft: "10px" }}
        onClick={handleButtonClick}
      >
        Leaderboard
      </button>
      <button
        className="taskPadButton for-desk"
        style={{ marginLeft: "10px" }}
        onClick={() =>
          window.open("https://forms.gle/UqP8gA1B59dr9fB66", "_blank")
        }
      >
        Feedback
      </button>
      {showTaskPad && (
        <div
          className="taskPad"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <textarea
            rows="4"
            cols="50"
            placeholder="Record your daily activities in this section; this practice serves as motivation for long-term success."
            value={taskText}
            style={{ padding: "5px" }}
            onChange={handleTaskInputChange}
          ></textarea>
          <div
            className="buttons"
            style={{ display: "flex", width: "60%", margin: "auto" }}
          >
            <button className="submit-button" onClick={handleTaskSubmit}>
              Submit Task
            </button>
            <button className="submit-button" onClick={handleTaskDelete}>
              Delete Last Task
            </button>
          </div>
        </div>
      )}

      {/* Display user's tasks */}
      <div className="usertask">
        <h4>My Tasks</h4>
        {userTasks.length > 0 ? (
          <ol className="task-list">
            {userTasks.map((task, index) => (
              <li key={index} className="task-list-item">
                {task.datetime} - {task.taskMessage}
              </li>
            ))}
          </ol>
        ) : (
          <p style={{ fontWeight: "700" }}>
            Document your daily accomplishments and current tasks; maintaining
            this log acts as a source of inspiration for future.
          </p>
        )}
      </div>
      <button
        className="taskPadButton for-mob"
        onClick={() =>
          window.open("https://forms.gle/UqP8gA1B59dr9fB66", "_blank")
        }
      >
        Feedback
      </button>
    </div>
  );
}
