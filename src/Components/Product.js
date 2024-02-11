import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";

export function Product({ name, price, imageUrl, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image style={styles.thumb} source={{ uri: imageUrl }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>$ {price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginVertical: 20,
    overflow: "hidden",
  },
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: "100%",
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
});

export default Product;
