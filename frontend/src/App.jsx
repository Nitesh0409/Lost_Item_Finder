import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/homePage/Home";
import SignUpPage from "./pages/authorization/signup";
import LoginPage from "./pages/authorization/login";
import LostItemsPage from "./pages/lostItems/Page";
import FoundItemsPage from "./pages/foundItems/Page";
import ReportLostPage from "./pages/report/lost/Page";
import ReportFoundPage from "./pages/report/found/Page";
import ReportClaimPage from "./pages/report/claim/claimPage";
import ProfilePage from "./pages/profile/Page";
import ClaimCenterPage from "./pages/claim_centre/Page";
import ClaimDetails from "./pages/claim_centre/details_claim";
import DetailsPage from "./pages/details/details";

import PrivateRoute from "./components/privateRoute";

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
            <Route
              path="/lost-items"
              element={
                <PrivateRoute>
                  <LostItemsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/found-items"
              element={
                <PrivateRoute>
                  <FoundItemsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/report-lost"
              element={
                <PrivateRoute>
                  <ReportLostPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/report-found"
              element={
                <PrivateRoute>
                  <ReportFoundPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/report-claim"
              element={
                <PrivateRoute>
                  <ReportClaimPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/claim-center"
              element={
                <PrivateRoute>
                  <ClaimCenterPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/claim-details"
              element={
                <PrivateRoute>
                  <ClaimDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/details/:id"
              element={
                <PrivateRoute>
                  <DetailsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
