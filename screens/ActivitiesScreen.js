import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

export default class ActivitiesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={{uri: 'https://img.icons8.com/color/96/000000/heart-health.png'}}
          />
        </View>
        <View>
          <Text
            style={styles.text}>
            MedData
          </Text>
        </View>

        <View style={styles.loginButtonContainer}>
        <Button
          onPress={this.signInWithGoogleAsync} 
          title="Sign in with Google"
          color="#4285f4"/>
        </View>

        <View>
        <Button
          onPress={this.logInWithFacebook}
          title="Sign in with Facebook"
          color="#3f5aa9"/>
        </View>
      </View>
    );
  }

  //Sign in with google
  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '1037579995443-98po5lmm577ig0gfb667v1mofh0qpu50.apps.googleusercontent.com',
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        // return result.accessToken;
        Alert.alert('Logged in!');
      } else {
        // return {cancelled: true};
      }
    } catch(e) {
      // return {error: true};
      console.log(e)
    }
  }

  //Login with Facebook
  async logInWithFacebook() {
    try {
      const {
        type,
        token,
      } = await Expo.Facebook.logInWithReadPermissionsAsync('1998838293471317', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 100, 
    height: 100
  },
  text: {
    fontSize: 20
  },
  loginButtonContainer: {
    marginBottom: 25, 
    marginTop: 150
  }
});
