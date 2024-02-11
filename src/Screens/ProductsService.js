import axios from 'axios';

const ProductsService = {
  async getProductDetails(productId) {
    try {
      const response = await axios.get(`http://localhost:3000/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  },


 async updateProduct(productId, updatedProductData) {
    try {
      const response = await axios.put(`http://localhost:3000/product/${productId}`, updatedProductData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
  async addProduct(newProductData) {
    try {
      const response = await axios.post(`http://localhost:3000/product`, newProductData);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }
};
export default ProductsService;
