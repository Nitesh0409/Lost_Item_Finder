// src/pages/ItemDetail.jsx
import "./ItemDetail.css";

function ItemDetail() {
  const item = {
    id: 1,
    name: "Black Earphones",
    description: "Lost near Library around 5 PM. Brand: Boat.",
    image: "https://via.placeholder.com/300",
    date: "2025-05-01",
    location: "Library",
    status: "Lost",
  };

  return (
    <div className="detail-container">
      <img src={item.image} alt={item.name} />
      <div className="detail-content">
        <h2>{item.name}</h2>
        <p>
          <strong>Description:</strong> {item.description}
        </p>
        <p>
          <strong>Date:</strong> {item.date}
        </p>
        <p>
          <strong>Location:</strong> {item.location}
        </p>
        <p>
          <strong>Status:</strong> {item.status}
        </p>
        <button>Contact</button>
      </div>
    </div>
  );
}

export default ItemDetail;
