import "./ReportLost.css";
import React, { useState } from "react";

function ReportLost() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lostItemData = {
      itemName,
      description,
      location,
      date,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/items/addLostItem",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(lostItemData),
        }
      );

      if (response.ok) {
        console.log("LOST ITEM REPORTED SUCCESSFULLY");

        setItemName("");
        setDescription("");
        setLocation("");
        setDate("");
      } else {
        console.log("Failed to report lost item");
      }
    } catch (error) {
      console.error("Error reporting lost item:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Report a Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Last Seen Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReportLost;
