import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./Screens/SignInScreen";
import ProductList from "./Screens/ProductsList";
import { ProductDetails } from "./Screens/ProductDetails";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native-web";
import { CartProvider } from "./Screens/CartContext";
import { CartIcon } from "./Screens/CartIcon";
import { Cart } from "./Screens/Cart";
import AddProduct from "./Screens/AddProduct";
import EditProduct from "./Screens/EditProduct";

const Stack = createStackNavigator();

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check user's login state from local storage or session storage
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      setIsUserLoggedIn(!!isLoggedIn);
    };
    checkLoginStatus();
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isUserLoggedIn ? "Products" : "SignIn"}
        >
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: "Login",
              headerTitleStyle: styles.headerTitle,
            }}
          />
          {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        /> */}
          <Stack.Screen
            name="Products"
            component={ProductList}
            options={({ navigation, route }) => ({
              title: "Products",
              headerTitleStyle: styles.headerTitle,
              headerLeft: null,
              headerRight: () => {
                const userType = route.params?.userType;
                if (userType === "admin") {
                  return (
                    <View style={{ flexDirection: "row" }}>
        
                <TouchableOpacity style={styles.logoutBtn}
                  title="Logout"
                  
                  onPress={() => navigation.navigate("SignIn")}
                >Logout</TouchableOpacity>
               
              
                    <Button
                      title="Add New Product"
                      onPress={() => navigation.navigate("AddProduct")}
                    />
                     </View>
                  );
                }
                return <View style={{ flexDirection: "row" }}>
        
        <TouchableOpacity style={styles.logoutBtn}
                  title="Logout"
                  
                  onPress={() => navigation.navigate("SignIn")}
                >Logout</TouchableOpacity>
              
              <CartIcon navigation={navigation} />
            </View>;
              },
            })}
          />

<Stack.Screen
  name="ProductDetails"
  component={ProductDetails}
  options={({ navigation }) => ({
    title: "Product details",
    headerTitleStyle: styles.headerTitle,
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        
        <TouchableOpacity style={styles.logoutBtn}
                  title="Logout"
                  
                  onPress={() => navigation.navigate("SignIn")}
                >Logout</TouchableOpacity>
        
        <CartIcon navigation={navigation} />
      </View>
    ),
  })}
/>
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={({ navigation }) => ({
              title: "My Cart",
              headerTitleStyle: styles.headerTitle,
              headerRight: () => <CartIcon navigation={navigation} />,
            })}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={({ navigation }) => ({
              title: "Add new product",
              headerTitleStyle: styles.headerTitle,
            })}
          />
          <Stack.Screen
            name="EditProduct"
            component={EditProduct}
            options={({ navigation }) => ({
              title: "Edit product",
              headerTitleStyle: styles.headerTitle,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
  },
  logoutBtn: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
