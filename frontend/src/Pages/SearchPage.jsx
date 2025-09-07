import React, { useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const { all_product } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = all_product.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-medium mb-8">Search Products</h1>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {searchTerm && (
        <div>
          <h2 className="text-xl font-medium mb-4">
            Search Results for "{searchTerm}" ({searchResults.length} items)
          </h2>
          
          {searchResults.length === 0 ? (
            <p className="text-gray-500">No products found matching your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group block"
                >
                  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-indigo-600">
                          ₹{product.new_price}
                        </span>
                        {product.old_price && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.old_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {!searchTerm && (
        <div className="text-center text-gray-500">
          <p>Enter a search term to find products</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
