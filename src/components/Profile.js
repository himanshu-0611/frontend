import React, { useEffect, useState } from "react";
import { Element } from "react-scroll";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import NavProg from "./NavProg";
import PorgramInfo from "./ProgramInfo";
import { useRef } from "react";
import "./profile.css";

function Profile() {
  const [userProgress, setUserProgress] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [error, setError] = useState(null);
  const [programData, setProgramData] = useState(null);
  const [, setUserTaskIds] = useState([]);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [selectedProgramTaskId, setSelectedProgramTaskId] = useState(
    localStorage.getItem("selectedProgramTaskId") || null
  );
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the isLoggedIn and userName cookies to log the user out
    Cookies.remove("isLoggedIn");
    Cookies.remove("userName");
    Cookies.remove("userId");
    Cookies.remove("i");
    localStorage.clear();

    // Redirect to the login page
    navigate("/LogIn");
  };

  // useEffect(() => {
  //   console.log("Executing useEffect");
  //   const storedTaskId = localStorage.getItem("selectedProgramTaskId");
  //   console.log("Stored Task ID:", storedTaskId);
  //   if (storedTaskId !== null) {
  //     setSelectedProgramTaskId(parseInt(storedTaskId));
  //   }
  // }, []);

  const isFirstRender = useRef(true);
  const handleTransitionEnd = () => {
    // Remove the element after the fade-out transition
    setShowWelcomeMessage(false);
  };
  useEffect(() => {
    if (isFirstRender.current) {
      // const username = Cookies.get("userName");
      setShowWelcomeMessage(true);

      // Hide the welcome message after 5 seconds
      setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 5000);

      isFirstRender.current = false;
    }
    const userId = Cookies.get("userId");
    console.log("userId:", userId);
    console.log("selectedProgram:", selectedProgram);

    const fetchUserProgress = async () => {
      try {
        if (userId && selectedProgram) {
          console.log("Making API call...");

          const response = await fetch(
            `http://ec2-43-204-105-124.ap-south-1.compute.amazonaws.com:5000/api/getUserProgress/${userId}/${selectedProgram}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("API call response:", response);

          if (response.status === 200) {
            const data = await response.json();
            console.log("Received User Progress Data:", data);
            setUserProgress(data);
            console.log(data);

            const taskIds = data.map((progress) => progress.task_id);
            setUserTaskIds(taskIds);

            // Extract the "task_id" from the first progress entry (assuming there's at least one)
            const initialTaskId = data.length > 0 ? data[0].task_id : null;
            console.log("initialTaskId:", initialTaskId);

            // Initialize selectedProgramTaskId from the extracted "task_id"
            if (!isNaN(initialTaskId) && initialTaskId !== null) {
              setSelectedProgramTaskId(parseInt(initialTaskId));

              // Save the initialTaskId to localStorage
              localStorage.setItem("selectedProgramTaskId", initialTaskId);
            }
          } else if (response.status === 404) {
            alert("You are not registered for this program");
            // Log the user out
            handleLogout();

            setError("Program Invalid for you");
          } else {
            setError("Error fetching user progress");
          }
        }
      } catch (error) {
        setError("Error fetching user ok progress: " + error.message);
      }
    };

    // Check if selectedProgram is truthy before making the API call
    if (selectedProgram) {
      fetchUserProgress();
    }
  },);

  useEffect(() => {
    const storedProgram = localStorage.getItem("selectedProgram");
    if (storedProgram) {
      setSelectedProgram(storedProgram);
    }
  }, []);

  const programIdToName = {
    2: "MERN",
    3: "Placement_Run_in_CPP",
    4: "Placement_Run_in_Java",
    5: "Placement_Run_in_Python",
    6: "DataStructuresAlgorithms_in_CPP",
    7: "DataStructuresAlgorithms_in_Java",
    8: "DataStructuresAlgorithms_in_Python"
    // Add more program mappings as needed
  };
  const IdToHeaderName = {
    2: "Full Stack Website Development in MERN",
    3: "Placement Run in CPP",
    4: "Placement Run in Java",
    5: "Placement Run in Python",
    6: "Data Structures and Algorithms in CPP",
    7: "Data Structures and Algorithms in Java",
    8: "Data Structures and Algorithms in Python"
    // Add more program mappings as needed
  };

  useEffect(() => {
    // Initialize selectedProgramTaskId from localStorage
    const storedTaskId = localStorage.getItem("selectedProgramTaskId");
    if (storedTaskId !== null) {
      setSelectedProgramTaskId(parseInt(storedTaskId));
    }
  }, []);

  const handleProgramSelect = (event) => {
    const selectedId = event.target.value;
    console.log("handleProgSelect id " + selectedId);
    setSelectedProgram(selectedId);

    // Find the task_id associated with the selected program and store it
    for (const progress of userProgress) {
      if (progress.program_id === selectedId) {
        setSelectedProgramTaskId(progress.task_id);
        break; // Exit the loop once a match is found
      }
    }

    localStorage.setItem("selectedProgram", selectedId);
  };

  useEffect(() => {
    if (selectedProgram) {
      fetchProgramData(programIdToName[selectedProgram]);
    }
  }, [selectedProgram]);

  useEffect(() => {
    // Update localStorage when selectedProgramTaskId changes
    localStorage.setItem("selectedProgramTaskId", selectedProgramTaskId);
  }, [selectedProgramTaskId]);

  useEffect(() => {
    if (selectedProgram) {
      fetchProgramData(programIdToName[selectedProgram]);
    }
  }, [selectedProgram]);

  const fetchProgramData = async (programName) => {
    try {
      const programId = Object.keys(programIdToName).find(
        (key) => programIdToName[key] === programName
      );

      if (!programId) {
        setError("Invalid program name");
        return;
      }

      const response = await fetch(
        `data/${programIdToName[programId]}_${programId}.json`
      );

      if (response.status === 200) {
        const data = await response.json();
        setProgramData(data);
      } else {
        setError("Error fetching program data");
      }
    } catch (error) {
      setError("Error fetching program data: " + error.message);
    }
  };

  const isTaskSubmitted = (taskId) => {
    return submittedTasks.includes(taskId);
  };

  const handleTaskSubmit = (taskId) => {
    const userId = Cookies.get("userId");
    const batch_no = Cookies.get("batch_no");
    // console.log("User ID:", userId);
    // console.log("Program ID:", selectedProgram);
    // console.log("Task ID:", taskId);

    // Check if the taskId is equal to or greater than selectedProgramTaskId
    console.log(taskId + " " + selectedProgramTaskId);
    if (taskId === selectedProgramTaskId + 1) {
      setSelectedProgramTaskId(selectedProgramTaskId + 1);
      fetch(
        `http://ec2-43-204-105-124.ap-south-1.compute.amazonaws.com:5000/api/submitTask/${userId}/${selectedProgram}/${batch_no}/${taskId}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          if (response.status === 200) {
            console.log("Task submitted successfully");

            // Ask the user if they want to open the feedback website
            const openFeedback = window.confirm(
              "Task Submitted for Evaluation. Would you like to provide us a feedback about the Program/Web App?\nIf yes, please open the pop up for G-Form after clicking 'OK'"
            );

            // If the user clicks "OK", open a new tab for feedback
            if (openFeedback) {
              window.open("https://forms.gle/UqP8gA1B59dr9fB66", "_blank");
              // Replace 'https://feedback-website.com' with the actual URL for feedback.
              // Make sure the URL is the correct one for collecting feedback.
            }

            // Update the list of submitted tasks
            setSubmittedTasks([...submittedTasks, taskId]);
          } else {
            console.error("Task submission failed");
          }
        })
        .catch((error) => {
          console.error("Error submitting task: " + error.message);
        });
    } else {
      console.error("Task submission blocked. Task is out of order.");
      window.alert("Task submission blocked. Task is out of order.");
    }
  };

  const renderSubmitButton = (taskId, index) => {
    const handleSubmitClick = () => {
      const confirmed = window.confirm(
        "Proceeding with the evaluation involves comparing the provided PDF from the Drive Link with the information submitted at the start of the Program. Any falsification may lead to the blacklisting of the account. Are you certain you want to proceed?"
      );

      if (confirmed) {
        handleTaskSubmit(taskId);
      }
    };

    if (selectedProgramTaskId >= taskId || isTaskSubmitted(taskId)) {
      return <div className="text-danger fs-5">Task Completed</div>;
    } else {
      return (
        <button onClick={handleSubmitClick} className="btn btn-primary">
          Click for Evaluation
        </button>
      );
    }
  };

  const renderIndexTable = () => (
    <table
      className="index-table"
      style={{
        margin: "0 auto",
        width: "40%",
        borderCollapse: "collapse",
        background: "white",
        color: "black",
        fontSize: "1.1rem",
        borderRadius: "0",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              padding: "15px",
              border: "4px solid black",
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "normal",
            }}
          >
            Month
          </th>
          <th
            style={{
              padding: "15px",
              border: "4px solid black",
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "normal",
            }}
          >
            Skillset
          </th>
          <th
            style={{
              padding: "15px",
              border: "4px solid black",
              fontWeight: "bold",
              fontSize: "normal",
              textAlign: "center"
            }}
          >
            Task ID
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(programData).map((month, monthIndex) => (
          <tr key={monthIndex}>
            <td
              style={{
                padding: "15px",
                border: "4px solid black",
                fontWeight: "normal",
                fontSize: "normal",
                textAlign: "center"
              }}
            >
              {monthIndex + 1}
            </td>
            <td
              style={{
                padding: "15px",
                border: "4px solid black",
                textAlign: "left",
                fontWeight: "normal",
                fontSize: "normal",
              }}
            >
              {month}
            </td>
            <td
              style={{
                padding: "15px",
                border: "4px solid black",
                fontWeight: "normal",
                fontSize: "normal",
                textAlign: "center"
              }}
            >
              {programData[month][0].taskid}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderProgramData = () => {
    var ind = 0;
    return (
      <>
        {renderIndexTable()}
        {programData && Object.keys(programData).length > 0
          ? Object.keys(programData).map((month, monthIndex) => (
              <div key={monthIndex}>
                {console.log("programData:", programData)}
                <h3 style={{ textAlign: "center", marginTop: "25px" }}>
                  {month}
                </h3>
                {programData[month].map((task, taskIndex) => (
                  <div key={taskIndex} className="task-container">
                    <p className="task-number">Task Number: {++ind}</p>
                    <h5>{task.title}</h5>
                    <p style={{ overflowWrap: "break-word" }}>
                      {task.link ? (
                        <>
                          Link:{" "}
                          <a target="_blank" rel="noreferrer" href={task.link}>
                            {task.link}
                          </a>
                        </>
                      ) : null}
                    </p>
                    {/* Add more fields based on your JSON structure, e.g., task.duration, task.YouTubeChannel */}
                    {task.subtasks && task.subtasks.length > 0 && (
                      <div className="subtask-container">
                        <h4>Subtasks:</h4>
                        {task.subtasks.map((subtask, subIndex) => (
                          <div key={subIndex} style={{ marginBottom: "10px" }}>
                            <h5>{subtask.title}</h5>
                            <p style={{ overflowWrap: "break-word" }}>
                              Link: <a href={subtask.link}>{subtask.link}</a>
                            </p>
                            <p>{subtask.duration}</p>
                            <p>YouTube Channel: {subtask.YouTubeChannel}</p>
                            {/* {renderSubmitButton(subtask.taskid, taskIndex)} */}
                          </div>
                        ))}
                      </div>
                    )}
                    {renderSubmitButton(task.taskid, taskIndex)}
                  </div>
                ))}
              </div>
            ))
          : null}
      </>
    );
  };

  return (
    <div>
      {showWelcomeMessage && (
        <div
          className={`welcome-overlay ${showWelcomeMessage ? "show" : ""}`}
          onTransitionEnd={handleTransitionEnd}
        >
          <p>Welcome, {Cookies.get("userName")}!</p>
        </div>
      )}
      {Cookies.get("isLoggedIn") === "true" ? (
        <>
          {programData ? (
            <div>
              <NavProg />
              <h3 className="program-name" style={{ marginBottom: "25px" }}>
                {IdToHeaderName[selectedProgram]}
              </h3>
              {renderProgramData()}
            </div>
          ) : (
            <div
              className="login-container"
              style={{ backgroundColor: "black" }}
            >
              <div className="login-image">
                {/* Your full-size image goes here */}
                <img src="/images/home/main.jpg" alt="Full-size" />
              </div>
              <div className="login-content">
                <div className="login-form">
                  {/* Your content goes here */}
                  {/* Your content goes here */}
                  <h2>Program Selection</h2>
                  <label style={{padding: "5px", color: "purple"}}>You can register for multiple programs, select anyone of your choice.</label>
                  <select
                    onChange={handleProgramSelect}
                    value={selectedProgram}
                    style={{color: "black"}}
                  >
                    <option value="">Select a Program</option>
                    <option value="3">Placement Run in CPP</option>
                    <option value="4">Placement Run in Java</option>
                    <option value="5">Placement Run in Python</option>
                    <option value="2">Full Stack Development in MERN</option>
                    <option value="6">Data Structures and Algorithms in CPP</option>
                    <option value="7">Data Structures and Algorithms in Java</option>
                    <option value="8">Data Structures and Algorithms in Python</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <PorgramInfo />
        </div>
      )}
      {error && <div>Error: {error}</div>}
      <Element name="contact-section">
        <div>
          {/* Your content */}
          <Footer />
        </div>
      </Element>
    </div>
  );
}

export default Profile;
