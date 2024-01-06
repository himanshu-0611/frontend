// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";

// function Programs() {
//   const [userProgress, setUserProgress] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Get userId from cookies
//     const userId = Cookies.get("userId");

//     // Define an async function to fetch user progress
//     const fetchUserProgress = async () => {
//       try {
//         if (userId) {
//           const response = await fetch(
//             `/api/getUserProgress/${userId}`, // Include userId as a query parameter
//             {
//               method: "GET",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           if (response.status === 200) {
//             const data = await response.json();
//             setUserProgress(data);
//           } else {
//             // Handle non-OK response here, e.g., display an error message
//             setError("Error fetching user progress");
//           }
//         }
//       } catch (error) {
//         // Handle network or other errors
//         setError("Error fetching user progress: " + error.message);
//       }
//     };

//     // Call the async function
//     fetchUserProgress();
//   }, []);

//   return (
//     <div>
//       <h2>User Progress</h2>
//       {error ? (
//         <p>{error}</p>
//       ) : userProgress.length > 0 ? (
//         userProgress.map((progress, index) => (
//           <div key={index}>
//             <h3>Progress {index + 1}</h3>
//             <p>User ID: {progress.p_user_id}</p>
//             <p>Program ID: {progress.program_id}</p>
//             <p>User Language: {progress.user_lang}</p>
//             <p>Task ID: {progress.task_id}</p>
//             <p>Streak: {progress.streak}</p>
//             <p>Last Active: {progress.last_active}</p>
//           </div>
//         ))
//       ) : (
//         <p>Loading user progress...</p>
//       )}
//     </div>
//   );
// }

// export default Programs;


function Programs() {
  const [userLang, setUserLang] = useState("");
  const [learningPath, setLearningPath] = useState([]);
  const [latestCompletedTask, setLatestCompletedTask] = useState(0);
  const [programId, setProgramId] = useState(null); // Add programId state
  const [taskStatus, setTaskStatus] = useState({}); // State to track task status
  const userId = Cookies.get("userId");

  const handleSubmitTask = async (taskId) => {
    try {
      const response = await fetch(
        `/api/submitTask/${userId}/${taskId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Task updated successfully");
        // Update task status in the state to indicate submission
        setTaskStatus((prevStatus) => ({
          ...prevStatus,
          [taskId]: true,
        }));
        // You may want to fetch updated data or perform other actions here
      } else {
        console.error("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task: " + error.message);
    }
  };

  useEffect(() => {
    const fetchUserLanguageAndPrograms = async () => {
      try {
        if (userId && programId) {
          const response = await fetch(
            `/api/getUserLanguage/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUserLang(data.user_lang);
            setLatestCompletedTask(data.task_id);
            // console.log(data);

            // Check for multiple programs
            const hasMultiplePrograms = data.some(
              (programData) => programData.program_id !== null
            );

            if (hasMultiplePrograms) {
              // If the user has multiple programs, let them choose
              setProgramId(null);
            } else {
              // If the user has only one program, set it automatically
              const userProgram = data.find(
                (programData) => programData.program_id !== null
              );
              setProgramId(userProgram.program_id);
            }

            // Initialize task status based on user's latest completed task
            const initialStatus = {};
            data.forEach((programData) => {
              if (programData.task_id <= latestCompletedTask) {
                initialStatus[programData.task_id] = true;
              } else {
                initialStatus[programData.task_id] = false;
              }
            });
            setTaskStatus(initialStatus);
          } else {
            console.error("Error fetching user language");
          }
        } else {
          console.error("User ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching user data: " + error.message);
      }
    };

    fetchUserLanguageAndPrograms();
  }, [userId, latestCompletedTask]);

  // Function to handle program selection
  const handleProgramSelect = (selectedProgramId) => {
    setProgramId(selectedProgramId);
  };

  // Function to fetch the learning path based on selected program
  useEffect(() => {
    if (1) {
      const fetchLearningPath = async () => {
        try {
          console.log("Fetching learning path with programId:", programId);
          console.log("User Language:", userLang);

          const pathResponse = await fetch(`/data/C++_1.json`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (pathResponse.ok) {
            const pathData = await pathResponse.json();
            console.log("Learning path data:", pathData);
            setLearningPath(pathData);
            // console.log("learning path: ", learningPath);
          } else {
            console.error("Error fetching learning path");
          }
        } catch (error) {
          console.error("Error fetching learning path: " + error.message);
        }
      };

      fetchLearningPath();
    }
  }, [userLang, programId]);

  // Rest of the component remains the same

  return (
    <>
      <div>User Language: {userLang}</div>
      {programId === null ? ( // Render program selection if programId is not set
        <ProgramSelection
          userId={userId}
          onProgramSelect={handleProgramSelect}
        />
      ) : (
        <>
          <h2>Learning Path</h2>
          {learningPath.map((task) => (
            <div key={task.taskid}>
              <h3>Task ID: {task.taskid}</h3>
              <p>Task Description: {task.title}</p>
              <p>Duration: {task.duration}</p>
              {/* <p>YouTube Channel: {task.YouTubeChannel}</p> */}
              {/* Render subtasks if they exist */}
              {task.subtasks && (
                <ul>
                  {task.subtasks.map((subtask) => (
                    <li key={subtask.title}>
                      <a
                        href={subtask.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subtask.title}
                      </a>
                      <p>Duration: {subtask.duration}</p>
                      <p>YouTube Channel: {subtask.YouTubeChannel}</p>
                    </li>
                  ))}
                </ul>
              )}
              {!taskStatus[task.taskid] ? (
                <button onClick={() => handleSubmitTask(task.taskid)}>
                  Submit
                </button>
              ) : (
                <p>Task Submitted</p>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Programs;

// ProgramSelection component to select a program
function ProgramSelection({ userId, onProgramSelect }) {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `/api/getUserLanguage/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setPrograms(data);
            // console.log(data);
          } else {
            console.error("Error fetching user programs");
          }
        } else {
          console.error("User ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching user programs: " + error.message);
      }
    };

    fetchPrograms();
  }, [userId]);

  const handleProgramSelection = () => {
    onProgramSelect();
  };
  // console.log(programs);
  return (
    <>
      <h2>Select Your Learning Path</h2>
      <select
        value={selectedProgram}
        onChange={(e) => {
          setSelectedProgram(e.target.value);
          console.log("Selected value:", e.target.value);
        }}
      >
        <option value="" disabled>
          Choose a Program
        </option>
        {programs.map((program) => (
          <option key={program.user_lang} value={program.user_lang}>
            {program.user_lang}
          </option>
        ))}
      </select>
      <button onClick={handleProgramSelection}>Select</button>
    </>
  );
}


backend -------------

app.get("/api/getUserLanguage/:userId", (req, res) => {
  // Extract the user_id from the request parameter
  const { userId } = req.params;

  // Retrieve all rows in the user_progress table with the provided user_id
  const getUserLanguagesAndTasksQuery = `
    SELECT program_id, user_lang, task_id
    FROM user_progress
    WHERE p_user_id = ?
  `;

  db.query(getUserLanguagesAndTasksQuery, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user languages and tasks: " + err.message);
      res.status(500).send("Error fetching user languages and tasks");
      return;
    }

    // Create an array to store the results
    const data = [];

    results.forEach((row) => {
      const program_id = row.program_id;
      const user_lang = row.user_lang;
      const task_id = row.task_id;

      data.push({
        program_id,
        user_lang,
        task_id,
        user_id: userId, // Include the user_id in the response
      });
    });

    res.json(data);
  });
});

// Add a new route to handle task submission
app.post("/api/submitTask/:userId/:taskId", (req, res) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  // Check if userId and taskId are valid
  if (!userId || !taskId) {
    res.status(400).json({ error: "Invalid userId or taskId" });
    return;
  }

  // Perform the database update to mark the task as completed
  const updateTaskQuery =
    "UPDATE user_progress SET task_id = ? WHERE p_user_id = ?";

  db.query(updateTaskQuery, [taskId, userId], (err, results) => {
    if (err) {
      console.error("Error updating task: " + err.message);
      res.status(500).json({ error: "Error updating task" });
      return;
    }

    res.status(200).json({ message: "Task updated successfully" });
  });
});