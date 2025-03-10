import { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => {
        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10)); // API provides 10 results per page
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [page]); // Re-run when `page` changes

  return (
    <>
      <Navbar setAuth={setAuth} />
      <div className="container">
        <h1>Star Wars Characters</h1>

        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
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

            {/* Pagination Buttons */}
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
          </>
        )}
        <Modal character={selectedChar} onClose={() => setSelectedChar(null)} />
      </div>
    </>
  );
}

export default Home;
