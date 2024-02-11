import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button, 
  StyleSheet
  } from 'react-native';
import ProductsService from './ProductsService';
import { CartContext } from './CartContext';




export function ProductDetails({route}) {
  const { productId } = route.params;
  console.log(productId)
  const [product, setProduct] = useState({});

  const { addItemToCart } = useContext(CartContext);


  function onAddToCart() {
    addItemToCart(product.id);
  }

  useEffect(() => {
   
    const fetchProductDetails = async () => {
      try {
        const productData = await ProductsService.getProductDetails(productId);
       console.log (productData)
       if(productData){
        setProduct(productData);
       }else {
        console.log('Product not found')
       }
        
        console.log(productData)
      } catch (error) {
        // Handle error
      }
    };

    fetchProductDetails();
  }, [productId]);
  console.log(product)

//   if (!product || Object.keys(product).length === 0) {
//     return (
//       <View>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          style={styles.image}
          source={product.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
            <Button
            onPress={onAddToCart}
            title="Add to cart"
            / >
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});