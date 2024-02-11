import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from './CartContext';

export function CartIcon({ navigation }) {
  const { getItemsCount } = useContext(CartContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Cart');
      }}
    >
      <Text style={styles.text}>Cart ({getItemsCount()})</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'orange',
    height: 32,
    padding: 12,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer', // Add cursor pointer for web compatibility
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
