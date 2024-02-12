import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native-web";
import Product from "../Components/Product";
import { useFocusEffect } from "@react-navigation/native";
import withNetworkConnectivity from "./withNetworkConnectivity";

const ProductList = ({ navigation, route }) => {
  const userType = route.params?.userType || "user";
    const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = async (productId) => {
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
    const confirmed = alert("Are you sure you want to delete this product?");

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
        <Product
          style={styles.productItem}
          {...product}
          onPress={() => {
            if (userType === "user") {
              navigation.navigate("ProductDetails", {
                productId: product.id,
              });
            }
          }}
        />
        {userType === "admin" && (
          <>
            <View style={styles.adminActionsContainer}>
              <View style={styles.adminActions}>
                <Button title="Edit" onPress={() => handleEdit(product.id)} />
                {/* <Button title="Delete" onPress={() => handleDelete(product.id)} /> */}
              </View>
              <View style={styles.adminActions}>
                <Button
                  title="Delete"
                  onPress={() => handleDelete(product.id)}
                />
              </View>
            </View>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        {Platform.OS === "web" && (
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}
      </View>
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
  // productsList: {
  //   // flex: 1,
  //   width: "100%", // Occupy full width
  //   backgroundColor: "#eeeeee",
  //     },

  productsListContainer: {
    // paddingVertical: 8,
    // paddingHorizontal: 8,
    // flexDirection: "row",
    // flexWrap: 'wrap',
    // alignSelf: 'flex-start',
    // overflow: "hidden",
    // marginHorizontal: "10%",
    // justifyContent: "center",
    // alignItems:  "center",
  },
  productContainer: {
    margin: 20,
    width: "30%",
    flexWrap: "wrap",
    // overflow: "hidden",
  },
  productItem: {
    margin: 40,
    // width: 100,
  },
  adminActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },

  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default withNetworkConnectivity(ProductList);
