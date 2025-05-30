import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ItemCard from "@/components/items/itemCard";
import { mockLostItems } from "@/lib/mockData";

const SearchIcon = () => <span className="place-icon">🔍</span>;
const FilterIcon = () => <span className="place-icon">⚙️</span>;

const categories = [
  "All",
  "Electronics",
  "Documents",
  "Jewelry",
  "Clothing",
  "Bags",
  "Keys",
  "Pets",
  "Sports Equipment",
  "Other",
];

export default function LostItemsPage() {
  const [items] = useState(mockLostItems);
  const [filteredItems, setFilteredItems] = useState(mockLostItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    let filtered = items;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Sort items
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.dateLost).getTime() - new Date(a.dateLost).getTime()
          );
        case "oldest":
          return (
            new Date(a.dateLost).getTime() - new Date(b.dateLost).getTime()
          );
        case "reward":
          return (b.reward || 0) - (a.reward || 0);
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [items, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="lost-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="lost-title">Lost Items</h1>
            <p className="lost-subtitle">
              Help reunite people with their lost belongings
            </p>
          </div>

          {/* Search and Filters */}
          <div className="card mb-8 shadow">
            <div className="card-content">
              <div className="filters-grid">
                <div className="relative">
                  <span className="search-icon">
                    <SearchIcon />
                  </span>
                  <input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="reward">Highest Reward</option>
                </select>

                <button className="btn-outline">
                  <FilterIcon /> More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="results-count">
              Showing {filteredItems.length} of {items.length} lost items
            </p>
          </div>

          {/* Items Grid */}
          <div className="items-grid">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ItemCard item={item} type="lost" />
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="no-results">
                No items found matching your criteria.
              </p>
              <button
                className="btn mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
