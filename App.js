import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import MainCard from './components/MainCard';

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState("27");
  const [location, setLocation] = useState("BR, Pernambuco");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? "#232634" : "#f2f2f2",
      alignItems: "center",
    },
    temperature: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
    },
    temperatureText: {
      color: darkTheme ? "#e0e0e0" : "black",
      fontSize: 50,
    },
    refreshButton: {
      position:"absolute",
      margin: 30,
      alignSelf: 'flex-start',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton}>
        <Feather name="refresh-ccw" size={24} color={darkTheme ? 'white' : 'dark'} />
      </TouchableOpacity>

      <Feather name="sun" style={{ marginTop: 50 }} size={40} color="orange" />
      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, { fontSize: 14 }]}>°C</Text>
      </View>
      <View style={styles.cardView}>
      {/* <MainCard></MainCard> */}
      </View> 
    </View>
  );
}
