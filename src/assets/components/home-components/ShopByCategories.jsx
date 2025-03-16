import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context-api/product-context/ProductContext'; // Adjust path

const ShopByCategories = () => {
    const { products, loading } = useContext(ProductContext);

    const categories = products ? [...new Set(products.map((product) => product.category).filter(Boolean))] : [];

    return (
        <section className="py-8 mb-[-80px] lg:mb-[-60px]">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold mb-4 text-center">Shop By Categories</h2>

                {/* Category Links */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            to={`/app/category/${category}`}
                            className="px-4 py-2 rounded-full border border-gray-300 hover:bg-yellow-100"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopByCategories;