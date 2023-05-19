import { StyleSheet, Text, TextInput, View, CheckBox, Switch, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Button, Input } from '@rneui/themed';
import { db } from '../firebase'

const AddEventScreen = () => {
  const [inputName, setInputName] = useState('');
  const [inputStart, setInputStart] = useState('');
  const [inputEnd, setInputEnd] = useState('');
  const [inputNotes, setInputNotes] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const addEvent = () => {
    const newEvent = {
      eventDate: inputStart,
      name: inputName,
      notes: inputNotes,
      recurring: false
    };
    db
      .collection("users")
      .doc("2IIxL4BkHNPdU2y6NVWl")
      .collection("events")
      .add(newEvent)
      .then(() => {
        console.log("Event is added");

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
          placeholder="[Enter Schedule Name]"
          value={inputName}
          onChangeText={text => setInputName(text)}
        />

        {/* <DatePicker selected={startTime} onChange={(date) => setStartTime(date)} />
      <DatePicker selected={endTime} onChange={(date) => setEndTime(date)} />   */}

        <Input
          style={styles.input}
          size="small"
          placeholder="[When Schedule Start]"
          value={inputStart}
          onChangeText={text => setInputStart(text)}
        />

        <Input
          style={styles.input}
          size="small"
          placeholder="[When Schedule End]"
          value={inputEnd}
          onChangeText={text => setInputEnd(text)}
        />

        <Input
          style={styles.input}
          size="small"
          placeholder="[Notes/Reminder]"
          value={inputNotes}
          onChangeText={text => setInputNotes(text)}
        />

        
        <Button 
        title="Add Schedule" 
        buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 15 }} 
        titleStyle={{ fontWeight: 'bold', fontSize: 16 }} 
        icon={{name: 'calendar',type: 'font-awesome',size: 15,color: 'white',}}
        onPress={addEvent} 
        style={{ padding: 10, marginVertical: 5, width: 370 }} />

      </View>
    </ImageBackground>

  )
}

export default AddEventScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginTop: 120,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 2,
    // Adjust the height and font size to make the input smaller
    height: 30,
    fontSize: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 2,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  button: {
    marginBottom: 10,
    width: 200,
  },
})