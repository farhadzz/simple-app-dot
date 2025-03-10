const Card = ({ name, height, mass, gender, index, onClick }) => {
  return (
    <div key={index} className="card" onClick={onClick}>
      <h2>{name}</h2>
    </div>
  );
};

export default Card;
