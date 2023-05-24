import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

const WelcomeScreen = () => {
  const [homeworks, setHomeworks] = useState([])
  const [time, setTime] = useState(0)
  const [dueSoon, setDueSoon] = useState([])

  useEffect(() => {
    let homeworksFromDB = []
    let dueSoonFromDB = []
    db.collection('users')
      .doc('k4UBkks0q2pL5RtjZstY')
      .collection('homeworks')
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          homeworksFromDB.push({ id: doc.id, ...doc.data() })
        })
        setHomeworks([...homeworksFromDB])
      })
  }, [])

  useEffect(() => {
    setDueSoon(
      homeworks.filter(
        (item) => item.dueDate.toDate() < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      )
    )
  }, [homeworks])

  useEffect(() => {
    let sum = 0
    homeworks.forEach((item) => {
      sum += item.timeNeeded
    })
    setTime(sum)
  }, [homeworks])

  const renderItem = ({ item }) => {
    return (
      <View style={styles.assignmentContainer}>
        <Text style={styles.assignmentTitle}>{item.title}</Text>
        <Text style={styles.assignmentDueDate}>
          Due on: {item.dueDate.toDate().toDateString()}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, [name] {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total homework time</Text>
          <Text style={styles.statValueCircle}>{time}</Text>
          
        </View>
        <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total assignments</Text>
            <Text style={styles.statValueCircle}>{homeworks.length}</Text>
          
        </View>
      </View>

      <View style={styles.dueSoonContainer}>
        <Text style={styles.dueSoonTitle}>Due Soon:</Text>
        <FlatList data={dueSoon} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: 'gray',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom:5
  },
  dueSoonContainer: {
    flex: 1,
  },
  dueSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  assignmentContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    marginBottom: 16,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statValueCircle: {
    backgroundColor: '#27D5FAD3',
    borderRadius: 50,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'hidden',
  },
  assignmentDueDate: {
    fontSize: 14,
    color: 'gray',
  },
})

export default WelcomeScreen
