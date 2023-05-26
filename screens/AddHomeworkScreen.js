import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { Button, Input, Slider } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebase';
import firebase from 'firebase/app';

const AddHomeworkScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [difficulty, setDifficulty] = useState(1);
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

  const handleSliderChange = (value) => {
    const newDifficulty = Number(value); // Convert the value to a number
    setDifficulty(newDifficulty);
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

        <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.input}>Difficulty:</Text>
          <Slider
            style={styles.slider}
            value={difficulty}
            minimumValue={1}
            maximumValue={5}
            step={1}
            onValueChange={handleSliderChange}
            thumbStyle={{ height: 20, width: 20 }}
          />
          <Text style={[styles.input, { marginLeft: 10 }]}>{difficulty}</Text>
        </View>

        <View style={styles.container}>
      <Slider
        style={styles.slider}
        value={difficulty}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={1}
        onValueChange={handleSliderChange}
      />
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{difficulty}</Text>
      </View>
    </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Add Homework"
            buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }}
            titleStyle={{ fontWeight: 'bold', fontSize: 15 }}
            icon={{ name: 'pencil-square', type: 'font-awesome', size: 15, color: 'white', }}
            onPress={addHomework}
            style={{ padding: 10, marginVertical: 5, width: 200 }} />

          <Button
            title="Cancel"
            buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }}
            titleStyle={{ fontWeight: 'bold', fontSize: 15 }}
            icon={{ name: 'arrow-circle-left', type: 'font-awesome', size: 15, color: 'white', }}
            onPress={() => navigation.navigate('Home')}
            style={{ padding: 10, marginVertical: 5, width: 200 }} />
          {/* <Button
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
          </Button> */}
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
    marginTop: 60,
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
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around'

  },
  button: {
    marginBottom: 10,
    width: 200,
  },
  slider: {
    width: '60%',
    height: 10
  },
  valueContainer: {
    position: 'absolute',
    top: -20,
    left: '50%',
    transform: [{ translateX: -10 }],
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  valueText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
