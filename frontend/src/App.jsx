// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./Layout";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/homePage/Home";
import SignUpPage from "./pages/authorization/signup";
import LoginPage from "./pages/authorization/login";
import LostItemsPage from "./pages/lostItems/Page";
import FoundItemsPage from "./pages/foundItems/Page";
import ReportLostPage from "./pages/report/lost/Page";
import ReportFoundPage from "./pages/report/found/Page";
import ProfilePage from "./pages/profile/Page";
import ClaimCenterPage from "./pages/claim_centre/Page";
import DetailsPage from "./pages/details/details";

// If you want to use a theme provider or toaster, import and use them here.

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-inter">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/lost-items" element={<LostItemsPage />} />
            <Route path="/found-items" element={<FoundItemsPage />} />
            <Route path="/report-lost" element={<ReportLostPage />} />
            <Route path="/report-found" element={<ReportFoundPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/claim-center" element={<ClaimCenterPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />

            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
