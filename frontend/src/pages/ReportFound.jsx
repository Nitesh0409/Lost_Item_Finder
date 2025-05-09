// src/pages/ReportFound.jsx
import "./ReportFound.css";

function ReportFound() {
  return (
    <div className="form-container">
      <h2>Report a Found Item</h2>
      <form>
        <input type="text" placeholder="Item Name" required />
        <textarea placeholder="Description" required></textarea>
        <input type="text" placeholder="Found Location" required />
        <input type="date" required />
        <input type="file" accept="image/*" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReportFound;
