import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const FetchData = ({ cat }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data

  // Fetch data function wrapped with useCallback for stable reference in useEffect
  const fetchData = useCallback(async () => {
    const apiUrl = cat
      ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=d0cb8c771f4d4cc291ac6feaa54024b3`
      : `https://newsapi.org/v2/top-headlines?country=in&apiKey=d0cb8c771f4d4cc291ac6feaa54024b3`;

    try {
      const response = await axios.get(apiUrl);
      setData(response.data.articles || []); // Ensure data is an array
      setFilteredData([]); // Clear filtered data when new data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [cat]);

  // Fetch data on component mount or when `cat` changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter articles based on search term
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData([]); // Reset to original data if search is empty
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
          articlesToDisplay.map((item, index) => (
            <div
              key={index}
              className="container my-3 p-3"
              style={{
                width: "600px",
                boxShadow: "2px 2px 10px silver",
                borderRadius: "10px",
              }}
            >
              <h5 className="my-2">{item.title}</h5>
              <div className="d-flex justify-content-center align-items-center">
                {item.urlToVideo ? (
                  <video
                    controls
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  >
                    <source src={item.urlToVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={item.urlToImage}
                    alt="Image not found"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <p className="my-1">{item.content}</p>
              <Link to={item.url} target="_blank" rel="noopener noreferrer">
                View more
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
