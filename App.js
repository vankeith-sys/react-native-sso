import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
});
