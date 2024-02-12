import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import ProductsService from "./ProductsService";
import withNetworkConnectivity from './withNetworkConnectivity';
// import * as ImagePicker from 'expo-image-picker';

const AddProduct = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async () => {
    // Validate input fields
    if (!name || !description || !price || !imageUrl) {
      alert('Please fill in all fields');
      return;
    }

    
    // Convert price to number
    const priceNumber = parseFloat(price);

    // Validate price
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Please enter a valid price');
      return;
    }

    // Prepare product object
    const newProduct = {
      name,
      description,
      price: priceNumber,
      imageUrl,
    };
    try {
      // Update product
      await ProductsService.addProduct( newProduct);
      // alert("Success", "Product updated successfully");
      setShowMessage(true);
      console.log(newProduct)
      setTimeout(() => {
        setShowMessage(false);
           // Navigate back to the product list
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error", "Failed to add product");
    }
    // Pass the new product to the parent component
    // onSubmit(newProduct);

    // Clear input fields
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter product description"
        multiline
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter product price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="Enter image URL"
      />

      <Button title="Add Product" onPress={handleSubmit} />
      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Product edited successfully!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  messageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green', // Customize the background color
    paddingVertical: 10,
    alignItems: 'center',
  },
  messageText: {
    color: 'white', // Customize the text color
    fontSize: 16,
  },
});

export default withNetworkConnectivity(AddProduct) ;
