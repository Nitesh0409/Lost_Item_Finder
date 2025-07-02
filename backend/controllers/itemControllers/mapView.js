const axios = require("axios");

exports.getRoute = async (req, res) => {
    try {
        const { start, end, profile } = req.body;

        const response = await axios.post(
            `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
            {
                coordinates: [start, end],
            },
            {
                headers: {
                    Authorization: process.env.ORS_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        console.error("Routing error:", err.message);
        res.status(500).json({ error: "Failed to fetch route." });
    }
};
