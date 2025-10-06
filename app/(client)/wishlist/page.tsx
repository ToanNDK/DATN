import NoAccess from '@/components/NoAccess'
import WishListProducts from '@/components/WishListProducts';
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const WishlistPage = async() => {
  const user = await currentUser();
  return (
    <>
      {user ? (
        
        <WishListProducts />
        ) : (
        <NoAccess details="Login to view your wishlist items"/>
        )}
    </>
  );
};

export default WishlistPage