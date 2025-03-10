import { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";

function Modal({ character, onClose }) {
  const [charDetails, setCharDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // request nothing if there's no character props
    if (!character) return;

    setLoading(true);
    axios
      .get(character)
      .then((res) => {
        setCharDetails(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching character details:", error);
        setLoading(false);
      });
  }, [character]);

  // Render nothing if there's no character props
  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <div className="spinner" />
        ) : (
          <div>
            <h2>{charDetails.name}</h2>
            <p>Height: {charDetails.height} cm</p>
            <p>Mass: {charDetails.mass} kg</p>
            <p>Gender: {charDetails.gender}</p>
            <p>Birth Year: {charDetails.birth_year}</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
