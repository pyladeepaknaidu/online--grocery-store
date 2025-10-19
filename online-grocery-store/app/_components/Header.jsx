"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi';
function Header() {
  const[categoryList,setCategoryList]=useState([]);

  useEffect(()=>{
    getCategoryList();
  },[])
  const getCategoryImage = (category) => {
    // Check if category has an image in Strapi
    if (category.attributes && category.attributes.image && category.attributes.image.data) {
      const imageUrl = category.attributes.image.data.attributes.url;
      return (
        <Image 
          src={`http://localhost:1337${imageUrl}`} 
          alt={category.attributes.name}
          width={20}
          height={20}
          className="rounded"
        />
      );
    }
    // Fallback to default icon if no image
    return <LayoutGrid className="h-4 w-4" />;
  };

  const getCategoryList=()=>{
    GlobalApi.getCategory().then(resp=>{
      console.log("categoryList Resp:",resp.data);
      // The API returns {data: [...], meta: {...}}, so we need resp.data.data
      if(resp.data && resp.data.data && Array.isArray(resp.data.data)){
        setCategoryList(resp.data.data);
      } else {
        setCategoryList([]);
      }
    }).catch(error=>{
      console.log("Error fetching categories:",error);
      setCategoryList([]);
    })
  }
  return (
    // Outer container: Flex, padding, shadow, and spaced out (justify-between)
    // NOTE: This container is the one that should have the 'shadow-md'
    <div className='p-5 shadow-md flex items-center justify-between'>
      
      {/* LEFT SECTION: Logo and Main Navigation/Search elements grouped */}
      <div className="flex items-center gap-4"> 
        
        {/* 1. Logo */}
        <Image src='/logo1.jpg' alt='logo' width={150} height={100} />

        {/* 2. Category Button - Increased size */}
       
     <DropdownMenu>
   <DropdownMenuTrigger asChild> 
     <h2 className='hidden md:flex gap-3 items-center border-2 rounded-full p-3 px-6 bg-slate-100 cursor-pointer transition-colors hover:bg-black text-lg font-semibold'>
          <LayoutGrid className='h-6 w-6' /> Category
        </h2></DropdownMenuTrigger>
    <DropdownMenuContent>
    <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {categoryList && categoryList.length > 0 ? categoryList.map((category,index)=>(
      <DropdownMenuItem key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100">
        {getCategoryImage(category)}
        <h2 className="text-sm font-medium">
          {category.attributes?.name || category.name}
        </h2>
      </DropdownMenuItem>
    )) : (
      <DropdownMenuItem>
       <h2>No categories available.</h2>
      </DropdownMenuItem>
    )}
    
    
  </DropdownMenuContent>
</DropdownMenu>
      </div>

      {/* MIDDLE SECTION: Search Bar (Give it max-width to look like a search bar) */}
      <div className='flex gap-3 items-center border rounded-full p-2 px-5 flex-grow mx-4 max-w-lg'>
        <Search className='h-5 w-5 text-gray-500'/>
        <input 
          type="text" 
          placeholder='Search' 
          className='outline-none w-full bg-transparent' // Make input background transparent
        />
      </div>

      {/* RIGHT SECTION: Cart Icon and Login Button grouped */}
      <div className='flex items-center gap-4'>
        
        {/* Cart/Shopping Bag Icon and Count */}
        <h2 className='flex gap-2 items-center text-lg cursor-pointer transition-opacity hover:opacity-80'> 
          <ShoppingBag className='h-6 w-6'/> 
          <span className='font-bold'>0</span>
        </h2>
        
        {/* Login Button */}
        <Button className='bg-black text-white px-2 py-2 hover:bg-gray-800'> 
          Login
        </Button>
      </div>
    </div>
  );
}

export default Header;