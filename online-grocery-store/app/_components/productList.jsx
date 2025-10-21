"use client"
import React from 'react'
import Image from 'next/image'

function ProductList({productList}) {
  console.log('Product data:', productList);
  
  return (
    <div className="mt-8">
      <h2 className='text-green-600 font-bold text-2xl mb-4'>Our Popular Products</h2>
      {productList && productList.data && productList.data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {productList.data.map((product, index) => {
            // Handle both Strapi and mock data structures
            const productData = product.attributes || product;
            let imageUrl;
            
            // Handle Strapi image URLs
            if (productData.image?.[0]?.url) {
              if (productData.image[0].url.startsWith('http')) {
                imageUrl = productData.image[0].url;
              } else {
                const baseUrl = 'http://localhost:1337';
                imageUrl = `${baseUrl}${productData.image[0].url}`;
              }
            } else {
              imageUrl = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop';
            }
            
            const productName = productData.name || `Product ${index + 1}`;
            const mrp = productData.mrp || productData.MRP || 0;
            const sellingPrice = productData.sellingPrice || productData.price || 0;
            
            return (
              <div key={product.id || index} className="bg-white rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative w-full h-32 sm:h-40 mb-3">
                  <Image
                    src={imageUrl}
                    alt={productName}
                    fill
                    className="object-cover rounded-lg"
                    onError={(e) => {
                      console.error(`Error loading image for product ${productName}:`, imageUrl);
                      e.target.src = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop';
                    }}
                  />
                </div>
                <h3 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2">{productName}</h3>
                <div className="mb-3">
                  {mrp > 0 && mrp !== sellingPrice && (
                    <p className="text-gray-400 text-xs sm:text-sm line-through">MRP: ${mrp}</p>
                  )}
                  <p className="text-black font-bold text-sm sm:text-base">${sellingPrice}</p>
                </div>
                <button className="w-full bg-green-600 text-white py-2 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-xs sm:text-sm">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No products available</p>
        </div>
      )}
    </div>
  )
}

export default ProductList