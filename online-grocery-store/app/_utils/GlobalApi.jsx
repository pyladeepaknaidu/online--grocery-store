import axios from "axios";

const axiosClient = axios.create({
    baseURL:'http://localhost:1337/api'
})

const getCategory = () => axiosClient.get('/categories?populate=*');
const getSlider = () => axiosClient.get('/sliders?populate=*').then(resp=>{
    console.log('Strapi API Response:', resp.data);
    return resp.data;
}).catch(error => {
    console.error('Strapi API Error:', error);
    // Return empty data when backend is not available
    return {
        data: []
    };
});
const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp=>{
  return resp.data;
})
const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp=>{
    console.log('Strapi Products Response:', resp.data);
    return resp.data;
}).catch(error => {
    console.log('Strapi backend not available, using mock products');
    // Return mock product data when backend is not available
    return {
        data: [
            {
                id: 1,
                name: "Fresh Organic Apples",
                mrp: 3.99,
                sellingPrice: 2.99,
                image: [{ url: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop" }]
            },
            {
                id: 2,
                name: "Organic Bananas",
                mrp: 2.49,
                sellingPrice: 1.99,
                image: [{ url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop" }]
            },
            {
                id: 3,
                name: "Fresh Carrots",
                mrp: 1.99,
                sellingPrice: 1.49,
                image: [{ url: "https://images.unsplash.com/photo-1598170845050-9b584dd6a4c4?w=300&h=300&fit=crop" }]
            },
            {
                id: 4,
                name: "Organic Spinach",
                mrp: 4.99,
                sellingPrice: 3.99,
                image: [{ url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop" }]
            },
            {
                id: 5,
                name: "Fresh Tomatoes",
                mrp: 3.49,
                sellingPrice: 2.49,
                image: [{ url: "https://images.unsplash.com/photo-1546470427-e26264be0f28?w=300&h=300&fit=crop" }]
            },
            {
                id: 6,
                name: "Organic Potatoes",
                mrp: 2.29,
                sellingPrice: 1.79,
                image: [{ url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop" }]
            },
            {
                id: 7,
                name: "Fresh Broccoli",
                mrp: 3.99,
                sellingPrice: 2.99,
                image: [{ url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop" }]
            },
            {
                id: 8,
                name: "Organic Onions",
                mrp: 1.99,
                sellingPrice: 1.49,
                image: [{ url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop" }]
            }
        ]
    };
});

export default {
    getCategory,
    getSlider,
    getCategoryList,
    getAllProducts
}
