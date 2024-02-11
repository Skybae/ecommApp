
// import React, { createContext, useEffect, useState } from 'react';
// import ProductsService from './ProductsService';


// export const CartContext = createContext();

// export const CartProvider = (props) => {
//   const [items, setItems] = useState([]);



  
//   // Function to add an item to the cart
//   const addItemToCart = (id) => {
//     useEffect(() => {
   
//         const fetchProductDetails = async () => {
//           try {
//             const productData = await ProductsService.getProductDetails(id);
//            console.log (productData)
//            if(productData){
//             setProduct(productData);
//            }else {
//             console.log('Product not found')
//            }
            
//             console.log(productData)
//           } catch (error) {
//             // Handle error
//           }
//         };
    
//         fetchProductDetails();
//       }, [id]);
//       console.log(product)
//     setItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === id);
//       if (!existingItem) {
//         return [
//           ...prevItems,
//           {
//             id,
//             qty: 1,
//             product,
//             totalPrice: product.price,
//           },
//         ];
//       } else {
//         return prevItems.map((item) =>
//           item.id === id
//             ? { ...item, qty: item.qty + 1, totalPrice: item.totalPrice + product.price }
//             : item
//         );
//       }
//     });
//   };

//   // Function to remove an item from the cart
//   const removeItemFromCart = (id) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   // Function to calculate the total price of items in the cart
//   const getTotalPrice = () => {
//     return items.reduce((total, item) => total + item.totalPrice, 0);
//   };

//   // Function to calculate the total number of items in the cart
//   const getItemsCount = () => {
//     return items.reduce((sum, item) => sum + item.qty, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addItemToCart,
//         removeItemFromCart,
//         getItemsCount,
//         getTotalPrice,
//       }}
//     >
//       {props.children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useEffect, useState } from 'react';
import ProductsService from './ProductsService';

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [items, setItems] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (product) {
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (!existingItem) {
          return [
            ...prevItems,
            {
              id: product.id,
              qty: 1,
              product: product,
              totalPrice: +product.price,
             
            },
          ];
        } else {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1, totalPrice: item.totalPrice + +product.price }
              : item
          );
        }
      });
    }
  }, [product]);

  // Function to add an item to the cart
  const addItemToCart = (id) => {
    const fetchProductDetails = async () => {
      try {
        const productData = await ProductsService.getProductDetails(id);
        if (productData) {
          setProduct(productData);
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchProductDetails();
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to calculate the total price of items in the cart
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };

  // Function to calculate the total number of items in the cart
  const getItemsCount = () => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItemToCart,
        removeItemFromCart,
        getItemsCount,
        getTotalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
