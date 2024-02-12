import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import ProductsService from "./ProductsService";
import { Alert } from "react-native-web";
import withNetworkConnectivity from "./withNetworkConnectivity";

const EditProduct = ({navigation, route }) => {
  const { productId } = route.params;
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await ProductsService.getProductDetails(productId);
        console.log(productData);
        if (productData) {
          setName(productData.name);
          setDescription(productData.description);
          setPrice(String(productData.price));
          setImageUrl(productData.imageUrl);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleSubmit = async () => {
    // Validate input fields
    if (!name || !description || !price || !imageUrl) {
      alert("Please fill in all fields");
      return;
    }

    // Convert price to number
    const priceNumber = parseFloat(price);

    // Validate price
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert("Please enter a valid price");
      return;
    }
    // Prepare product object
    const updatedProduct = {
     
      name,
      description,
      price: priceNumber,
     imageUrl:imageUrl,
    };
    try {
      // Update product
      await ProductsService.updateProduct(productId, updatedProduct);
      // alert("Success", "Product updated successfully");
      setShowMessage(true);
      console.log(updatedProduct)
      setTimeout(() => {
        setShowMessage(false);
        // Navigate back to the product list
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error", "Failed to update product");
    }
  };
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Product Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Price:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <Button title="Edit Product" onPress={handleSubmit} />
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
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
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

export default withNetworkConnectivity(EditProduct);
