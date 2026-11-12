import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [counter, counterFunc] = useState(0);

  return (
    <>
      <Text style={styles.text}>{counter}</Text>
      <View style={styles.view}>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            if (counter < 10) counterFunc(counter + 1);
          }}
        >
          <Text style={styles.text}>+</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            if (counter > 0) counterFunc(counter - 1);
          }}
        >
          <Text style={styles.text}>-</Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: "30%",
  },
  text: {
    fontSize: 50,
    alignSelf: "center",
    verticalAlign: "auto",
  },
  pressable: {
    height: "25%",
    width: "30%",
    margin: "1%",
    backgroundColor: "white",
    color: "white",
  },
});
