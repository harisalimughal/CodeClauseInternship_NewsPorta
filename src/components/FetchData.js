import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"; // Import the SearchBar component

const FetchData = ({ cat }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Memoize fetchData with proper dependencies
  const fetchData = useCallback(async () => {
    const apiUrl = cat
      ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=d0cb8c771f4d4cc291ac6feaa54024b3`
      : `https://newsapi.org/v2/top-headlines?country=in&apiKey=d0cb8c771f4d4cc291ac6feaa54024b3`;

    try {
      const response = await axios.get(apiUrl);
      setData(response.data.articles || []);
      setFilteredData([]); // Clear filtered data when new data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [cat]); // Add `cat` as a dependency since it's used inside `fetchData`

  // useEffect depends on the stable fetchData function
  useEffect(() => {
    fetchData();
  }, [fetchData]); // ESLint warning resolved here

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData([]);
      return;
    }
    const filteredArticles = data.filter((article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredArticles);
  };

  const articlesToDisplay = filteredData.length > 0 ? filteredData : data;

  return (
    <div className="container my-4">
      <SearchBar onSearch={handleSearch} />

      <div
        className="container d-flex justify-content-center align-items-center flex-column my-3"
        style={{ minHeight: "100vh" }}
      >
        {articlesToDisplay.length > 0 ? (
          articlesToDisplay.map((items, index) => (
            <div
              key={index}
              className="container my-3 p-3"
              style={{
                width: "600px",
                boxShadow: "2px 2px 10px silver",
                borderRadius: "10px",
              }}
            >
              <h5 className="my-2">{items.title}</h5>
              <div d-flex justify-content-center align-items-center>
                {items.urlToVideo ? (
                  <video
                    controls
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  >
                    <source src={items.urlToVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={items.urlToImage}
                    alt="img not found"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <p className="my-1">{items.content}</p>
              <Link to={items.url} target="blank">
                view more
              </Link>
            </div>
          ))
        ) : (
          <p>No articles to display.</p>
        )}
      </div>
    </div>
  );
};

export default FetchData;
