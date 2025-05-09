// src/pages/ReportLost.jsx
import "./ReportLost.css";

function ReportLost() {
  return (
    <div className="form-container">
      <h2>Report a Lost Item</h2>
      <form>
        <input type="text" placeholder="Item Name" required />
        <textarea placeholder="Item Description" required></textarea>
        <input type="text" placeholder="Last Seen Location" required />
        <input type="date" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReportLost;
