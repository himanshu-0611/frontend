import React, { useState } from "react";
import { Element } from "react-scroll";
import Footer from "./Footer";
import "./podcasts.css"; // You can create a CSS file for styling

function Podcasts() {
  // Example JSON data for YouTube videos
  const videoData = [
    {
      id: 1,
      title: "DSA DeMystified: A Journey to Mastery in Under 4 Months",
      thumbnail: "/images/podcasts/dsa1.png",
      videoUrl: "https://youtu.be/8OtPMJRBSFA?si=BemlnTYpxZ1P-BK4",
    },
    {
      id: 2,
      title:
        "Unlocking Opportunities: A Deep Dive into the GitHub Student Developer Pack",
      thumbnail: "/images/podcasts/githubpack.png",
      videoUrl: "https://youtu.be/WOfneZmBozU?si=4mzb3NLAE_JRrpql",
    },
    {
      id: 3,
      title:
        "Mastering HackerRank: Strategies for Efficient Use and Strong Programming Logic",
      thumbnail: "/images/podcasts/hackerrank.png",
      videoUrl: "https://youtu.be/mOIUQ3uyDxI?si=l9QtX6Ya9yIg9_qQ",
    },
    // Add more video entries as needed
  ];

  const [videos] = useState(videoData);

  return (
    <>
      <h2 style={{ textAlign: "center", padding: "1.5rem" }}>Out Podcasts</h2>
      <div className="podtext">
        <p style={{ textAlign: "center", fontSize: "1.009rem" }}>
          Explore our archive of past podcasts meticulously organized by
          DevCrusade, featuring conversations with current working professionals
          and experienced individuals. Delve into valuable insights, industry
          experiences, and expertise shared by our esteemed guests.
        </p>
      </div>
      <div className="video-list">
        <div className="list-bg">
          {videos.map((video) => (
            <div key={video.id} className="video-item">
              <img src={video.thumbnail} alt={video.title} />
              <h3>{video.title}</h3>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="watch-button">Watch Video</button>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Element name="contact-section">
        <div>
          <Footer />
        </div>
      </Element>
    </>
  );
}

export default Podcasts;
