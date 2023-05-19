import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase';
import firebase from 'firebase/app';

const AddHomeworkScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');
  const [timeNeeded, setTimeNeeded] = useState('');
  const [priority, setPriority] = useState('');
  const [note, setNote] = useState('');

  const addHomework = () => {
    db.collection('users')
      .doc('YEuRehNNhMMQdrsqGWyi')
      .collection('homeworks')
      .add({
        title: title,
        difficulty: difficulty,
        startDate: firebase.firestore.Timestamp.fromDate(
          new Date(Date.parse(startDate))
        ),
        dueDate: firebase.firestore.Timestamp.fromDate(
          new Date(Date.parse(dueDate))
        ),
        type: type,
        subject: subject,
        timeNeeded: timeNeeded,
        priority: priority,
        note: note,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        console.log('Added homework successfully!');
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/background3.png')}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.content}>
        <Input
          style={styles.input}
          size="small"
          placeholder="[Enter Title]"
          value={title}
          onChangeText={setTitle}
        />

        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
        />

        <Input
          style={styles.input}
          size="small"
          placeholder="[Enter Start Date MM DD, YY]"
          value={startDate}
          onChangeText={setStartDate}
        />

        <Input
          style={styles.input}
          placeholder="[Enter Due Date MM DD, YY]"
          value={dueDate}
          onChangeText={setDueDate}
        />

        <Input
          style={styles.input}
          placeholder="[Enter number 1 (lowest) - 5 (highest)]"
          value={difficulty}
          onChangeText={setDifficulty}
          keyboardType="numeric"
        />

        <Input
          style={styles.input}
          placeholder="[Enter Type]"
          value={type}
          onChangeText={setType}
        />

        <Input
          style={styles.input}
          placeholder="[Enter Subject]"
          value={subject}
          onChangeText={setSubject}
        />

        <Input
          style={styles.input}
          placeholder="[Enter number of minutes needed]"
          value={timeNeeded}
          onChangeText={setTimeNeeded}
        />

        <Input
          style={styles.input}
          placeholder="[Enter number 1 (lowest) - 5 (highest)]"
          value={priority}
          onChangeText={setPriority}
          keyboardType="numeric"
        />

        <Input
          style={styles.input}
          placeholder="[Any notes or reminders?]"
          value={note}
          onChangeText={setNote}
        />

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            appearance="filled"
            onPress={addHomework}
          >
            Add Homework
          </Button>

          <Button
            style={styles.button}
            appearance="filled"
            onPress={() => navigation.navigate('Home')}
          >
            Cancel
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AddHomeworkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginTop:60,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 2,
    // Adjust the height and font size to make the input smaller
    height: 30,
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    width: 200,
  },
});
