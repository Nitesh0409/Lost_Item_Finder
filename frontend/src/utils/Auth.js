
export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const isExpired = decoded.exp * 1000 < Date.now();

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
  