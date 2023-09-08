import React, { useState } from 'react';
// ... (previous imports and code)

// ... (previous imports and code)

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (searchTerm.trim() === '') {
      return; // No need to search if the search term is empty
    }

    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${searchTerm}&apiKey=d0cb8c771f4d4cc291ac6feaa54024b3`);
      if (response.ok) {
        const data = await response.json();

        // Log the response for debugging
        console.log('API response:', data);

        if (data.articles) {
          setSearchResults(data.articles);
        } else {
          console.error('API response does not contain articles:', data);
        }
      } else {
        console.error('Error fetching search results:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div>
        {/* Display search results */}
        {searchResults.map((article) => (
          <div key={article.title}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
