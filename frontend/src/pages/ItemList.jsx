// src/pages/ItemList.jsx
import "./ItemList.css";

const dummyItems = [
  {
    id: 1,
    name: "Black Earphones",
    description: "Lost near Library",
    image: "https://via.placeholder.com/150",
    date: "2025-05-01",
  },
  {
    id: 2,
    name: "Red Water Bottle",
    description: "Found in Mess Area",
    image: "https://via.placeholder.com/150",
    date: "2025-05-03",
  },
];

function ItemList() {
  return (
    <div className="item-list-container">
      <h2>All Items</h2>
      <div className="items-grid">
        {dummyItems.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>
              <strong>Date:</strong> {item.date}
            </p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;
