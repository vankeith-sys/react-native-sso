import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task'
import { authentication } from './firebase-config'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    // console.log(task);
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const logInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
    .then((re)=>{
      console.log(re);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  const logInWithFacebook = () => {
    // Facebook Firebase APP ID: 844951199550308
    // Facebook Firebase APP Secret: d173ac35ea1c7aad9a6ccd27cc95945e
    // Facebook Firebase OAuth Redirect URL: https://mypolicy-c57d9.firebaseapp.com/__/auth/handler
    // Dashboard -> Facebook Login -> Web
    // Facebook Login -> Settings -> Valid OAuth Redirect URIs (Paste Redirect URI above)
    const provider = new FacebookAuthProvider();
    signInWithPopup(authentication,provider)
    .then((re)=>{
      console.log(re);
    })
    .catch((err)=>{
      console.log(err);
    })
    // Facebook Login needs a secure connection to test
    // ngrok http 3000
  }


  // for apple auth: npm install --save @react-native-firebase/app
  // yarn add @react-native-firebase/auth
  // need com.build.identifier
  // sudo arch -x86_64 gem install ffi
  // arch -x86 pod install 
  // yarn add @invertase/react-native-apple-authentication

  // apple dev account -> cert, identifiers, profiles -> identifiers 
    // need to register app with iOS Bundle ID
    // download the .plist file
    // put plist file in build / xcode / project



  async function logInWithApple() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
  
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

  

  return (
    <View style={styles.container}>
      {/* <Text>Holy shet, this is my first react native app.</Text>
      <Text>I'm fucking amazing</Text> */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Unified Single Sign On</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go. */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask()}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
          {/* Google */}
          <TouchableOpacity onPress={() => logInWithGoogle()}>
          <View style={styles.items}>
            <Task text={'Log In with Google'}/>
          </View>
          </TouchableOpacity>
          {/* Facebook */}
          <TouchableOpacity onPress={() => logInWithFacebook()}>
          <View style={styles.items}>
            <Task text={'Log In with Facebook'}/>
          </View>
          </TouchableOpacity>
          {/* Apple */}
          <TouchableOpacity onPress={() => logInWithApple()}>
          <View style={styles.items}>
            <Task text={'Log In with Apple'}/>
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                width: 160,
                height: 45,
              }}
              onPress={() => logInWithApple().then(() => console.log('Apple sign-in complete!'))}
            />
          </View>
          </TouchableOpacity>
          <Task text={'Log In with Email'}/>
        </View>
      </View>
      
      <KeyboardAvoidingView 
        // behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value = {task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#COCOCO',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#COCOCO',
    borderWidth: 1,
  },
  addText: {},
});
