// import React, { useContext } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ProductContext } from '../assets/components/context-api/product-context/ProductContext'; // Adjust path

// const CategoryProducts = () => {
//     const { categoryName } = useParams();
//     const { products } = useContext(ProductContext);

//     const filteredProducts = products.filter((product) => product.category === categoryName);

//     return (
//         <section className="py-8">
//             <div className="container mx-auto px-4">
//                 <h2 className="text-2xl font-semibold mb-4 text-center">
//                     Products in {categoryName}
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredProducts.map((product) => (
//                         <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
//                             <Link to={`/app/product/${product._id}`}>
//                                 <div className="w-full h-48 object-contain rounded-md flex overflow-x-auto">
//                                     {product.images && product.images.length > 0 && (
//                                         <img
//                                             src={product.images[0]}
//                                             alt={`${product.name} - 0`}
//                                             className="min-w-full h-full object-contain rounded-md mr-2"
//                                         />
//                                     )}
//                                 </div>
//                             </Link>
//                             <div className="mt-4 flex flex-col items-start justify-center">
//                                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                                 <p className="text-gray-600">₦{product.price}</p>
//                             </div>
//                             <div className="mt-6 flex flex-col items-center justify-center">
//                                 <Link
//                                     to={`/app/product/${product._id}`}
//                                     className="mt-2 w-full bg-black text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-center"
//                                 >
//                                     View
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default CategoryProducts;
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../assets/components/context-api/product-context/ProductContext'; // Adjust path
import MainHeader from '../assets/components/home-components/MainHeader';
import TopHeader from '../assets/components/home-components/TopHeader';
import MobileFooter from '../assets/components/home-components/MobileFooter';
import Footer from '../assets/components/home-components/Footer';

const CategoryProducts = () => {
    const { category } = useParams();
    const { products } = useContext(ProductContext);

    // Ensure products is defined before accessing its properties
    const filteredProducts = products ? products.filter((product) => product.category === category) : [];

return (
    <>
    <TopHeader />
    <MainHeader />
    <section className="py-8">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Products in {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
                        <Link to={`/app/product/${product._id}`}>
                            <div className="w-full h-48 object-contain rounded-md flex overflow-x-hidden">
                                {product.images && product.images.length > 0 && (
                                    <img
                                        src={product.images[0]}
                                        alt={`${product.name} - 0`}
                                        className="min-w-full h-full object-contain rounded-md mr-2"
                                    />
                                )}
                            </div>
                        </Link>
                        <div className="mt-4 flex flex-col items-start justify-center">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">₦{product.price}</p>
                        </div>
                        <div className="mt-6 flex flex-col items-center justify-center">
                            <Link
                                to={`/app/product/${product._id}`}
                                className="mt-2 w-full bg-black text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors text-center"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
    <MobileFooter />
    <Footer />
    </>
    );
};

export default CategoryProducts;