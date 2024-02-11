// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import { CartContext } from './CartContext';

// export function Cart({ navigation }) {
//   const { items, getItemsCount, getTotalPrice } = useContext(CartContext);

//   function Totals() {
//     const [total, setTotal] = useState(0);

//     useEffect(() => {
//       setTotal(getTotalPrice());
//     }, [getTotalPrice]);

//     return (
//       <View style={styles.cartLineTotal}>
//         <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
//         <Text style={styles.lineRight}>$ {total}</Text>
//       </View>
//     );
//   }

//   function renderItem({ item }) {
//     return (
//       <View style={styles.cartLine}>
//         <Text style={styles.lineLeft}>
//           {item.product.name} x {item.qty}
//         </Text>
//         <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       style={styles.itemsList}
//       contentContainerStyle={styles.itemsListContainer}
//       data={items}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.product.id.toString()}
//       ListFooterComponent={Totals}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   cartLine: {
//     flexDirection: 'row',
//   },
//   cartLineTotal: {
//     flexDirection: 'row',
//     borderTopColor: '#dddddd',
//     borderTopWidth: 1,
//   },
//   lineTotal: {
//     fontWeight: 'bold',
//   },
//   lineLeft: {
//     fontSize: 20,
//     lineHeight: 40,
//     color: '#333333',
//   },
//   lineRight: {
//     flex: 1,
//     fontSize: 20,
//     fontWeight: 'bold',
//     lineHeight: 40,
//     color: '#333333',
//     textAlign: 'right',
//   },
//   itemsList: {
//     backgroundColor: '#eeeeee',
//   },
//   itemsListContainer: {
//     backgroundColor: '#eeeeee',
//     paddingVertical: 8,
//     marginHorizontal: 8,
//   },
// });

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from './CartContext';

export function Cart({ navigation }) {
  const { items, getItemsCount, getTotalPrice, addItemToCart, removeItemFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getTotalPrice());
  }, [getTotalPrice]);

  function renderItem({ item }) {
    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>
          {item.product.name} X {item.qty}
        </Text>
        <Text style={styles.lineRight}>$ {item.totalPrice}</Text>
        <TouchableOpacity onPress={() => removeItemFromCart(item.product.id)}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.id.toString()}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${total}</Text>
        <Button title="Add More Items" onPress={() => navigation.navigate('Products')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  lineLeft: {
    fontSize: 16,
    color: '#333333',
  },
  lineRight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  removeButton: {
    color: 'red',
  },
  itemsList: {
    flex: 1,
  },
  itemsListContainer: {
    flexGrow: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

