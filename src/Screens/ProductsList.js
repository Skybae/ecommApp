import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, FlatList, Platform, StyleSheet, TextInput } from "react-native-web";
import Product from "../Components/Product";
import { useFocusEffect } from "@react-navigation/native";

const ProductList = ({ navigation, route }) => {
  const { userType } = route.params;
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = async (productId) => {
    // Navigate to the edit screen passing productId
    navigation.navigate("EditProduct", { productId });
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/product");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleDelete = async (productId) => {
    const confirmed = confirm("Are you sure you want to delete this product?");

    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:3000/product/${productId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          // Remove the deleted product from the local state
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          alert("Product deleted successfully", "Product deleted successfully");
        } else {
          alert("Error", "Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error", "Failed to delete product");
      }
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function renderProduct({ item: product }) {
    return (
      <View style={styles.productContainer}>
        {userType === "admin" && (
          <>
            <View style={styles.adminActions}>
              <Button title="Edit" onPress={() => handleEdit(product.id)} />
              {/* <Button title="Delete" onPress={() => handleDelete(product.id)} /> */}
            </View>
            <View>
              <Button title="Delete" onPress={() => handleDelete(product.id)} />
            </View>
          </>
        )}
        <Product
          {...product}
          onPress={() => {
            navigation.navigate("ProductDetails", {
              productId: product.id,
            });
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
       {Platform.OS === 'web' && (
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      )}
      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        keyExtractor={(item) => item.id.toString()}
        data={filteredProducts}
        numColumns={3}
        renderItem={renderProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productsList: {
    backgroundColor: "#eeeeee",
    flex: 1,
  },
  productsListContainer: {
    paddingVertical: 8,
    // marginHorizontal: 8,
  },
  productContainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: 'space-between',
    marginBottom: 8,
  },
  adminActions: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ProductList;
