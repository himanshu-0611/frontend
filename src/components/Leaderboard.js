import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Footer from "./Footer";
import "./leaderboard.css";

function Leaderboard() {
  const batchNoFromCookies = Cookies.get("batch_no");
  const selectedProgramFromStorage = localStorage.getItem("selectedProgram");
  console.log(batchNoFromCookies + " now id" + selectedProgramFromStorage);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortedLeaderboardData, setSortedLeaderboardData] = useState([]);
  const [goButtonClicked, setGoButtonClicked] = useState(false);
  const [filteredLeaderboardData, setFilteredLeaderboardData] = useState([]);

  const rowsPerPage = 50; // Number of rows to display per page

  const totalPages = Math.ceil(leaderboardData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = leaderboardData.slice(indexOfFirstRow, indexOfLastRow);

  const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase().trim();
    const filteredData = leaderboardData.filter((entry) =>
      entry.p_user_name.toLowerCase().includes(searchTerm)
    );
    setFilteredLeaderboardData(filteredData);
    setGoButtonClicked(true); // Set the flag when the "Go" button is clicked
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!batchNoFromCookies) {
          console.error("Batch_no not founFd in cookies.");
          return;
        }

        if (!selectedProgramFromStorage) {
          console.error("Selected program not found in local storage.");
          return;
        }

        // Define the backend API endpoint with batch_no and selectedProgram in the URL
        const apiUrl = `http://ec2-43-204-105-124.ap-south-1.compute.amazonaws.com:5000/api/leaderboard/${batchNoFromCookies}/${selectedProgramFromStorage}`;

        // Make a GET request to fetch data from the backend
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check if the request was successful
        if (response.ok) {
          const result = await response.json();

          // Ensure that data is an array before setting the state
          if (result.success && Array.isArray(result.data)) {
            // Sort the data in descending order based on task_id
            const sortedLeaderboardData = result.data.sort(
              (a, b) => b.task_id - a.task_id
            );
            setLeaderboardData(sortedLeaderboardData);
            setSortedLeaderboardData(sortedLeaderboardData);
            console.log(sortedLeaderboardData);
          } else {
            console.error("Invalid data format received from the server.");
          }
        } else {
          console.error(
            "Error fetching leaderboard data:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error.message);
      }
    };

    fetchData(); // Call the async function
  }, [batchNoFromCookies, selectedProgramFromStorage]);

    const IdToHeaderName = {
      1: "C++",
      2: "MERN",
      3: "Placement Run in CPP",
      4: "Placement Run in Java",
      5: "Placement Run in Python",
      // Add more program mappings as needed
    };

  return (
    <div className="page-container">
      <h1>Leaderboard</h1>
      <h3>
        Program: {IdToHeaderName[selectedProgramFromStorage]}<br/>Batch Number: {" "}
        {batchNoFromCookies}
      </h3>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Go</button>
      </div>

      {goButtonClicked && <h3>Search Results</h3>}
      {goButtonClicked && filteredLeaderboardData.length === 0 && (
        <h4 className="no-rec" style={{ textAlign: "center" }}>
          No Records Found
        </h4>
      )}

      <div className="search-table">
        {goButtonClicked && filteredLeaderboardData.length > 0 && (
          <table className="leaderboard-table sep-table">
            <thead>
              <tr className="header-row">
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                {/* Add other columns based on your backend data */}
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboardData.map((entry, index) => (
                <tr key={entry.p_user_id}>
                  <td>{sortedLeaderboardData.indexOf(entry) + 1}</td>
                  <td>{entry.p_user_name}</td>
                  <td>{entry.task_id * 5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {console.log(leaderboardData)}

      <h3 style={{ textAlign: "center" }}>Main Leaderboard</h3>
      <div className="leaderboard-container">
        <table className="leaderboard-table">
          <thead>
            <tr className="header-row">
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              {/* Add other columns based on your backend data */}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((entry, index) => (
              <tr key={entry.p_user_id}>
                <td>{indexOfFirstRow + index + 1}</td>
                <td>{entry.p_user_name}</td>
                <td>{entry.task_id * 5}</td>
                {/* Add other cells based on your backend data */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-buttons">
        <button
          className="page-control"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="page-control"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Leaderboard;
