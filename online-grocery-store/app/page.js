import { Button } from "@/components/ui/button";
import Image from "next/image";
import dynamic from "next/dynamic";
import GlobalApi from "./_utils/GlobalApi";
import Slider from "./_components/Slider";
import CategoryList from "./_components/categoryList";
import ProductList from "./_components/productList";


export default async function Home() {
  try {
    const sliderList = await GlobalApi.getSlider();
    const categoryList = await GlobalApi.getCategoryList();
    const productList = await GlobalApi.getAllProducts();
    console.log("Slider API Response:", sliderList);
    console.log("Category API Response:", categoryList);
    console.log("Products API Response:", productList);
    return (
      <div className="p-10 px-16">
        {/* Sliders */}
        <Slider sliderList={sliderList} />
        {/* Category List */}
        <CategoryList categoryList={categoryList} />
        {/* Product List */}
        <ProductList productList={productList} />
      </div>
    );
  } catch (error) {
    console.error("API Error:", error?.message || error);

    return (
      <div className="p-10 px-16">
        {/* Slider disabled — fallback UI */}
        <div>API Error — testing</div>
        {/* Render minimal page content or error message */}
      </div>
    );
  }
}