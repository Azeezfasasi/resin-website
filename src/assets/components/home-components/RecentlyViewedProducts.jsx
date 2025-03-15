import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecentlyViewedProducts = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    // Retrieve recently viewed products from local storage
    const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(viewedProducts);
  }, []);

  const clearRecentlyViewed = () => {
    localStorage.removeItem('recentlyViewed');
    setRecentlyViewed([]);
  };

  return (
    <div className="recently-viewed-products">
      <h2>Recently Viewed Products</h2>
      {recentlyViewed.length > 0 ? (
        <>
          <div className="recently-viewed-list">
            {recentlyViewed.map((product) => (
              <div key={product._id} className="recently-viewed-item">
                <Link to={`/app/product/${product._id}`}>
                  <img src={product.image} alt={product.name} className="recently-viewed-image" />
                  <p className="recently-viewed-name">{product.name}</p>
                </Link>
              </div>
            ))}
          </div>
          <button onClick={clearRecentlyViewed} className="clear-recently-viewed">
            Clear Recently Viewed
          </button>
        </>
      ) : (
        <p>No recently viewed products.</p>
      )}
    </div>
  );
};

export default RecentlyViewedProducts;