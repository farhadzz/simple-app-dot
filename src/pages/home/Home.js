import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce"; // Import debounce
import "./Home.css";
import Card from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";

function Home({ setAuth }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [selectedChar, setSelectedChar] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch characters based on page or search query
  const fetchCharacters = async (query, page) => {
    setLoading(true);
    const url = query
      ? `https://swapi.dev/api/people/?search=${query}` // Search endpoint
      : `https://swapi.dev/api/people/?page=${page}`; // Pagination endpoint

    try {
      const response = await axios.get(url);
      setCharacters(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // Update total pages
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search function
  // eslint-disable-next-line
  const handleSearch = useCallback(
    debounce((query) => {
      if (query) {
        fetchCharacters(query, 1); // Fetch search results
      } else {
        fetchCharacters("", page); // Fetch default characters for the current page
      }
    }, 500), // 500ms delay
    [page] // Add `page` as a dependency
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the search query state
    handleSearch(query); // Call the debounced search function
  };

  // Clear search and reset to default character list
  const clearSearch = () => {
    setSearchQuery("");
    fetchCharacters("", 1); // Fetch the first page of all characters
  };

  // Fetch characters when page changes
  useEffect(() => {
    if (!searchQuery) {
      fetchCharacters("", page);
    }
    // eslint-disable-next-line
  }, [page]); // Re-run when `page` changes

  // Cleanup function
  useEffect(() => {
    return () => {
      handleSearch.cancel(); // Cancel any pending debounced calls
    };
  }, [handleSearch]);

  return (
    <>
      {/* Navbar for Logout */}
      <Navbar setAuth={setAuth} />
      <div className="container">
        <h1>Star Wars Characters</h1>

        {/* Search Input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button onClick={clearSearch} className="clear-search-button">
              Clear
            </button>
          )}
        </div>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="card-container">
              {characters.map((char, index) => (
                <Card
                  key={index}
                  name={char.name}
                  height={char.height}
                  mass={char.mass}
                  gender={char.gender}
                  index={index}
                  onClick={() => setSelectedChar(char.url)}
                />
              ))}
            </div>

            {/* Pagination Buttons (only show if not searching) */}
            {!searchQuery && !loading && page !== totalPages && (
              <div className="pagination">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal for Detail Character */}
        <Modal character={selectedChar} onClose={() => setSelectedChar(null)} />
      </div>
    </>
  );
}

export default Home;
