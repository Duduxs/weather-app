import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const InfoCard = (props) => {
  const styles = StyleSheet.create({
    card: {
      alignItems: "center",
      margin: 10,
      minWidth: 150,
    },
    text: {
      color: "#e8e8e8",
      margin: 5,
      marginLeft: 15,
      fontSize: 18,
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{props.title}</Text>
      <Text style={[styles.text, { color: "#d3d3d3" }]}>{props.value}</Text>
    </View>
  );
};

export default InfoCard;
