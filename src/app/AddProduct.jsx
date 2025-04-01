import { useState, useContext } from 'react';
import { ProductContext } from '../assets/components/context-api/product-context/ProductContext';
import { Helmet } from 'react-helmet';
import MyAccountMenu from '../assets/components/account-components/MyAccountMenu';
import AccountHeader from '../assets/components/account-components/AccountHeader';

const AddProduct = () => {
    const { addProduct } = useContext(ProductContext);
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        shortDescription: '',
        longDescription: '',
        basePrice: '',
        images: [],
        variants: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [popup, setPopup] = useState({ show: false });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductData((prev) => ({ ...prev, images: files }));
        setImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const addVariant = () => {
        setProductData((prev) => ({
            ...prev,
            variants: [...prev.variants, { name: '', value: '' }],
        }));
    };

    const removeVariant = (index) => {
        setProductData((prev) => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index),
        }));
    };

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...productData.variants];
        updatedVariants[index][field] = value;
        setProductData((prev) => ({ ...prev, variants: updatedVariants }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('name', productData.name);
            formData.append('category', productData.category);
            formData.append('shortDescription', productData.shortDescription);
            formData.append('longDescription', productData.longDescription);
            formData.append('basePrice', productData.basePrice);

            productData.images.forEach((image) => formData.append('images', image));
            formData.append('variants', JSON.stringify(productData.variants));

            await addProduct(formData);

            setProductData({
                name: '',
                category: '',
                shortDescription: '',
                longDescription: '',
                basePrice: '',
                images: [],
                variants: [],
            });
            setImagePreviews([]);
            setPopup({ show: true });
        } catch (error) {
            setError('Failed to add product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

return (
    <>
    <Helmet>
      <title>Add Product - Resin By Saidat</title>
   </Helmet>
   <div className="w-full flex flex-row justify-start">
      <div className="w-[0%] lg:w-[20%]">
        <MyAccountMenu />
      </div>
      <div className="w-full flex flex-col items-start mt-0">
        <AccountHeader />
        <div className="container w-[95%] lg:w-[60%] lg:h-[80vh] mx-auto mt-8 mb-[80px] lg:mb-0 overflow-y-scroll overflow-x-hidden">            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md space-x-4 space-y-6 mb-10 pb-6">
                <h2 className="text-xl font-bold mb-4 text-center">Add Product</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {popup.show && <p className="text-green-500">Product added successfully!</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Product Name:
                    </label>
                    <input type="text" placeholder="Product Name" value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} className="w-full border rounded px-3 py-2" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category:
                    </label>
                    <select value={productData.category} onChange={(e) => setProductData({ ...productData, category: e.target.value })} className="w-full border rounded px-3 py-2">
                        <option value="">Select a Category</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Coaster">Coaster</option>
                        <option value="Frame">Frame</option>
                        <option value="Stationery">Stationery</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Decor">Decor</option>
                        <option value="Personal Care">Personal Care</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">
                        Short Description:
                    </label>
                    <textarea placeholder="Short Description" value={productData.shortDescription} onChange={(e) => setProductData({ ...productData, shortDescription: e.target.value })} className="w-full border rounded px-3 py-2" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longDescription">
                        Long Description:
                    </label>
                    <textarea placeholder="Long Description" value={productData.longDescription} onChange={(e) => setProductData({ ...productData, longDescription: e.target.value })} className="w-full border rounded px-3 py-2" required />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price:
                    </label>
                    <input type="number" placeholder="Price" value={productData.basePrice} onChange={(e) => setProductData({ ...productData, basePrice: e.target.value })} className="w-full border rounded px-3 py-2" required />
                </div>
                
                <div className='mb-4'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Images</label>
                    <p className='text-gray-500'>You can add up to 10 images</p>
                    <input type="file" multiple onChange={handleImageChange} className="w-full border rounded px-3 py-2" />
                    <div className="flex mt-2 space-x-2 flex-wrap">
                        {imagePreviews.map((src, index) => (
                            <img key={index} src={src} alt="Preview" className="w-16 h-16 object-cover rounded" />
                        ))}
                    </div>
                </div>
                
                <div>
                    <label className="block text-gray-700">Variants</label>
                    {productData.variants.map((variant, index) => (
                        <div key={index} className="flex space-x-2 mb-2">

                            {/* Variant name */}
                            <select value={variant.name} onChange={(e) => handleVariantChange(index, 'name', e.target.value)} className="border rounded px-2 py-1">
                                <option value="">Select Attribute</option>
                                <option value="size">Size</option>
                                <option value="color">Color</option>
                                <option value="material">Material</option>
                                <option value="weight">Weight</option>
                                <option value="length">Length</option>
                                <option value="width">Width</option>
                                <option value="hight">Height</option>
                            </select>

                            {/* Variant Value */}
                            <input type="text" placeholder="Variant Value" value={variant.value} onChange={(e) => handleVariantChange(index, 'value', e.target.value)} className="border rounded px-2 py-1" required />
                            <button type="button" onClick={() => removeVariant(index)} className="bg-red-500 text-white px-2 rounded">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={addVariant} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Add Variant</button>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-yellow-900 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                        disabled={loading}
                    >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                            Adding Product...
                          </>
                        ) : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
    </>
    );
};

export default AddProduct;
