import React from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { EDColors } from "../utils/EDColors";

export default class EDProgressLoader extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <ActivityIndicator style={[styles.spinner, this.props.style]} color={EDColors.primary} size={'large'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height ,
    zIndex: 997,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: EDColors.transparentBlack
  },
  spinner: {
    flex: 1,
    alignSelf: "center",
    zIndex: 1000
  }
});
