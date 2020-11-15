import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import MainCard from "./components/MainCard";
import InfoCard from "./components/InfoCard";
import * as Location from "expo-location";
import getCurrentWeather from "./api/Api";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState("27");
  const [location, setLocation] = useState("BR, Pernambuco");
  const [currentHour, setCurrentHour] = useState("13:00");

  const [wind, setWind] = useState("65");
  const [umidity, setUmidity] = useState("80");
  const [tempMin, setTempMin] = useState("21");
  const [tempMax, setTempMax] = useState("31");
  const [locationCoords, setLocationCoords] = useState([]);

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
      position: "absolute",
      margin: 30,
      alignSelf: "flex-start",
    },
    cardView: {
      color: darkTheme ? "black" : "white",
      margin: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    info: {
      alignItems: "center",
      backgroundColor: darkTheme ? "#393e54" : "#8f8f8f",
      borderRadius: 20,
      width: 350,
      height: 230,
    },
    infoText: {
      color: darkTheme ? "#e0e0e0" : "white",
      margin: 15,
      fontSize: 20,
      fontWeight: "bold",
    },
    infoCards: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    squareButton: {
      backgroundColor: darkTheme ? "#f2f2f2" : "#8f8f8f",
      justifyContent: "center",
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },
    circleButton: {
      backgroundColor: darkTheme ? "#232634" : "#f2f2f2",
      alignSelf: darkTheme ? "flex-end" : "flex-start",
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 20,
    },
  });

  function convertKelvintoC(kelvin) {
    return parseInt(kelvin - 273.15);
  }

  async function setCurrentWeather() {
    await getLocation();

    let date = new Date();
    setCurrentHour(date.getHours() + ":" + date.getMinutes());

    const data = await getCurrentWeather(locationCoords);

    setCurrentTemperature(convertKelvintoC(data[0]));
    setTempMin(convertKelvintoC(data[1]));
    setTempMax(convertKelvintoC(data[2]));
    setLocation(data[3]);
    setWind(data[4]);
    setUmidity(data[5]);

  }

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Sem permissão");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      await setLocationCoords(location.coords);
    }
  }

  useEffect(() => {
    setCurrentWeather();
  }, [currentTemperature]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton}>
        <Feather
          name="refresh-ccw"
          size={24}
          color={darkTheme ? "white" : "black"}
          onPress={() => setCurrentWeather()}
        />
      </TouchableOpacity>

      <Feather name="sun" style={{ marginTop: 50 }} size={40} color="orange" />
      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, { fontSize: 14 }]}>°C</Text>
      </View>

      <Text style={[styles.temperatureText, { fontSize: 14 }]}>
        {location}, {currentHour}
      </Text>

      <View style={styles.cardView}>
        <MainCard
          title={"Manhã"}
          backgroundColor={darkTheme ? "#ff873d" : "#cc6e30"}
          temperature={"21°"}
          icon={"morning"}
        ></MainCard>
        <MainCard
          title={"Tarde"}
          backgroundColor={darkTheme ? "#D29600" : "#FCC63F"}
          temperature={"27°"}
          icon={"afternoon"}
        ></MainCard>
        <MainCard
          title={"Noite"}
          backgroundColor={darkTheme ? "#008081" : "#38B7D8"}
          temperature={"12°"}
          icon={"night"}
        ></MainCard>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Informações adicionais</Text>
        <View style={styles.infoCards}>
          <InfoCard title={"Vento"} value={wind + " m/h"}></InfoCard>
          <InfoCard title={"Umidade"} value={umidity + "%"}></InfoCard>
          <InfoCard title={"Temp. Min"} value={tempMin + " °C"}></InfoCard>
          <InfoCard title={"Temp. Max"} value={tempMax + " °C"}></InfoCard>
        </View>
      </View>

      <View style={styles.themeButton}>
        <View style={styles.squareButton}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() =>
              darkTheme ? setDarkTheme(false) : setDarkTheme(true)
            }
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
