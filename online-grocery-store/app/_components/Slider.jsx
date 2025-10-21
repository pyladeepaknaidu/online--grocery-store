"use client"
import React from 'react'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

function Slider({ sliderList }) {
  console.log('Slider data:', sliderList);
  console.log('Slider data type:', typeof sliderList);
  console.log('Slider data length:', sliderList?.data?.length);
  
  if (sliderList?.data) {
    console.log('First slider image structure:', sliderList.data[0]?.image);
    console.log('All slider data:', sliderList.data);
  }
  
  return (
    <div className="w-full">
      {sliderList && sliderList.data && sliderList.data.length > 0 ? (
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {sliderList.data.map((slider, index) => {
                // Handle Strapi image URLs properly
                let imageUrl;
                if (slider.image?.[0]?.url) {
                  if (slider.image[0].url.startsWith('http')) {
                    imageUrl = slider.image[0].url;
                  } else {
                    // Strapi local images
                    imageUrl = `http://localhost:1337${slider.image[0].url}`;
                  }
                } else {
                  // Fallback image
                  imageUrl = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&h=400&fit=crop';
                }
                
                return (
                  <CarouselItem key={slider.id || index} className="pl-0">
                    <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden rounded-lg sm:rounded-2xl">
                      <Image 
                        src={imageUrl}
                        alt="Slider image" 
                        fill
                        className='object-cover w-full h-full'
                        priority={index === 0}
                        sizes="100vw"
                        onError={(e) => {
                          console.error(`Error loading image for slider ${index + 1}:`, imageUrl);
                          e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&h=400&fit=crop';
                        }}
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : (
        <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">No slider data available</p>
        </div>
      )}
    </div>
  )
}

export default Slider