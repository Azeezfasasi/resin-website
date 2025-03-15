import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const RecentlyViewedProducts = () => {
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        const viewedProducts = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        setRecentlyViewed(viewedProducts);
    }, []);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft -= 200; // Adjust scroll distance as needed
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft += 200; // Adjust scroll distance as needed
        }
    };

return (
    <>
    <div className="bg-white p-4 rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Recently Viewed Products</h2>
      {recentlyViewed.length > 0 ? (
      <>
        <div className="flex flex-row relative w-[95%] self-center mx-auto mb-[10px] lg:mb-[0px]">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto space-x-4 scroll-smooth scrollbar-hide self-center mx-auto"
          >
            {recentlyViewed.map((product) => (
              <div key={product._id} className="min-w-[150px] text-center self-center">
                <Link to={`/app/product/${product._id}`}>
                  <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-contain mb-2 rounded-md"
                  />
                  <p className="text-sm font-semibold text-[18px]">{product.name}</p>
                </Link>
              </div>
            ))}
          </div>
          <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
          </button>
          <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
          </button>
        </div>
      </>
      ) : (
        <p className='text-center'>No recently viewed products.</p>
      )}
    </div>   
  </>
  );
};

export default RecentlyViewedProducts;