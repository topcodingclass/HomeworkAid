import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SectionList, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Input } from "@rneui/themed";
import { db } from '../firebase';

const ScheduleScreen = () => {
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const Item = ({ name }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{name}</Text>
    </View>
  );

  const SectionHeader = ({ dueDate }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{dueDate}</Text>
    </View>
  );

  const fetchData = () => {
    console.log('2 useEffect start');
    let activitiesFromDB = [];

    db.collection('users')
      .doc('YEuRehNNhMMQdrsqGWyi')
      .collection('homeworks')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          activitiesFromDB.push({ id: doc.id, ...doc.data() });
        });
        console.log('3 useEffect finish db');
      });

    db.collection('users')
      .doc('YEuRehNNhMMQdrsqGWyi')
      .collection('events')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          activitiesFromDB.push({ id: doc.id, title: doc.data().name, dueDate: doc.data().eventStart });
        });
        console.log('3.0 useEffect finish db');

        console.log('3.1 *******************', activitiesFromDB);
        const groupedData = activitiesFromDB.reduce((acc, cur) => {
          let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
          const dueDate = cur.dueDate.toDate().toLocaleString(undefined, options); // format to date only;
          const item = { id: cur.id, name: cur.title, time: cur.dueDate.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
          const group = acc.find((group) => group.dueDate === dueDate);
          if (!group) {
            acc.push({ dueDate, data: [item] });
          } else {
            group.data.push(item);
          }
          return acc;
        }, []);

        // Sort by date
        const sortedData = groupedData.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort by due date

        console.log('3.2************', sortedData);
        setHomeworks(sortedData);
        console.log('4 useEffect end');
      });
  };

  const renderItem = ({ item }) => <Item name={`${item.name}            ${item.time}`} />;
  const renderSectionHeader = ({ section: { dueDate } }) => <SectionHeader dueDate={dueDate} />;

  return (
    <ImageBackground source={require('../assets/background_bottom.png')} resizeMode="cover" style={{ flex: 1, width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Daily Schedules</Text>
          <View style={styles.buttonContainer}>
          <Button
              title="Add Schedule"
              buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 9 }}
              titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
              icon={{ name: 'plus', type: 'font-awesome', color: 'white', size:12 }}
              // onPress={login}
              style={{ padding: 10, marginVertical: 5 }} />
            <Button
              title="Add Requering"
              buttonStyle={{ backgroundColor: 'rgba(39, 213, 245, 0.8)', borderRadius: 9 }}
              titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
              icon={{ name: 'plus', type: 'font-awesome', color: 'white', size:12 }}
              // onPress={login}
              style={{ padding: 10, marginVertical: 5 }} />
          </View>
        </View>
        <SectionList
          sections={homeworks}
          keyExtractor={(item, index) => item.id + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </ImageBackground>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
  },
  sectionHeader: {
    padding: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#27D5F5CC',
  },
  item: {
    padding: 5,
    backgroundColor: '#ffffff',
  },
  itemText: {
    fontSize: 14,
    color: '#333333',
  },
});
