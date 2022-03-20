import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Holy shet, this is my first react native app.</Text>
      <Text>I'm fucking amazing</Text> */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Unified Single Sign On</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go. */}
          <Task text={'Log In with Google'}/>
          <Task text={'Log In with Facebook'}/>
          <Task text={'Log In with Apple'}/>
          <Task text={'Log In with Email'}/>
        </View>
      </View>
      
      <KeyboardAvoidingView 
        // behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} />
        <TouchableOpacity>
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
