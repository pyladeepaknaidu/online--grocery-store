"use client"
import React from 'react'
import Image from 'next/image'

function CategoryList({ categoryList }) {
  console.log('Category data:', categoryList);
  
  return (
    <div className="mt-5">
     <h2 className='text-green-600 font-bold text-2xl'>Shop by Category</h2> 
      {categoryList && categoryList.data && categoryList.data.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoryList.data.map((category, index) => {
            // Handle the correct Strapi data structure
            let imageUrl;
            if (category.Icon?.[0]?.url) {
              if (category.Icon[0].url.startsWith('http')) {
                imageUrl = category.Icon[0].url;
              } else {
                // Try different Strapi URL patterns
                const baseUrl = 'http://localhost:1337';
                const iconUrl = category.Icon[0].url;
                imageUrl = `${baseUrl}${iconUrl}`;
              }
            } else {
              // Fallback to a generic category image based on category name
              const fallbackImages = {
                'vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop',
                'chicken & egg': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop',
                'Bakery': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
                'Grains': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
                'Fruits': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop',
                'Milk & juice': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop',
                'personal Care': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop'
              };
              imageUrl = fallbackImages[category.name] || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop';
            }
            
            console.log(`Category ${index + 1} (${category.name}) image URL:`, imageUrl);
            console.log(`Category ${index + 1} Icon data:`, category.Icon?.[0]);
            
            return (
              <div key={category.id || index} className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative w-16 h-16 mb-2">
                  <Image
                    src={imageUrl}
                    alt={category.name || `Category ${index + 1}`}
                    fill
                    className="object-cover rounded-lg hover:scale-125 transition-all ease-in-out"
                    onError={(e) => {
                      console.error(`Error loading image for category ${category.name}:`, imageUrl);
                      e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop';
                    }}
                  />
                </div>
                <h3 className="text-xs font-medium text-center">
                  {category.name || `Category ${index + 1}`}
                </h3>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No categories available</p>
        </div>
      )}
    </div>
  )
}

export default CategoryList