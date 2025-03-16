import React from 'react';
import MainHeader from "../assets/components/home-components/MainHeader";
import TopHeader from "../assets/components/home-components/TopHeader";
import { useWishlist } from "../assets/components/context-api/product-context/WishlistContext";

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <>
            <TopHeader />
            <MainHeader />
            <div>
                <h2>My Wishlist</h2>
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <ul>
                        {wishlist.map((item) => (
                            <li key={item.id}>
                                {item.name} 
                                <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Wishlist;