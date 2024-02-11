import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const [userData, adminData] = await Promise.all([
        axios.get('http://localhost:3000/users', {
          params: {
            email: userEmail,
            password: password
          }
        }),
        axios.get('http://localhost:3000/admins', {
          params: {
            email: userEmail,
            password: password
          }
        })
      ]);

      if (userData.data.length > 0) {
        // User exists in users
        navigation.navigate('Products', { userType: 'user' });
      } else if (adminData.data.length > 0) {
        // User exists in admins
        navigation.navigate('Products', { userType: 'admin' }); // or 'user'

      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred while processing your request');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.inputStyle}>
          <TextInput
            style={styles.input}
            placeholder="User Email"
            value={userEmail}
            onChangeText={setUserEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginBottom:'30%',
    width: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputStyle: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
