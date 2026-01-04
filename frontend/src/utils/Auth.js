import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp) {
            localStorage.removeItem("token");
            return false;
        }
        const isExpired = decoded.exp * 1000 - 30000 < Date.now();

        if (isExpired) {
            localStorage.removeItem("token");
            return false;
        }

        return true;
    } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        return false;
    }
};
  