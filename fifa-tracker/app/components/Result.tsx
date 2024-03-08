import { View, Text, TextInput, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { colorPallet } from "./ColorPallet";

type Resultprops = {
  team1: SetStateType;
  team2: SetStateType;
};

type SetStateType = React.Dispatch<React.SetStateAction<any>>;

export function Result(props: Resultprops) {

  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

return (
    <View
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        }}
    >
        <TextInput
            style={[
                styles.input,
                isFocused1 ? { color: colorPallet.primary } : null,
            ]}
            keyboardType="numeric"
            placeholder="00"
            maxLength={2}
            caretHidden={true}
            selectTextOnFocus={true}
            multiline={true}
            onFocus={() => {
                setIsFocused1(true);
            }}
            onBlur={() => setIsFocused1(false)}
            onChangeText={(text) => {
                if (!isNaN(Number(text))) {
                    props.team1(text);
                } else {
                    props.team1("");
                }
            }}
        />
        <Text style={{ fontSize: 96 }}>:</Text>
        <TextInput
            style={[
                styles.input,
                isFocused2 ? { color: colorPallet.primary } : null,
            ]}
            keyboardType="numeric"
            placeholder="00"
            maxLength={2}
            caretHidden={true}
            selectTextOnFocus={true}
            multiline={true}
            onFocus={(e: any) => {
                setIsFocused2(true);
            }}
            onBlur={() => setIsFocused2(false)}
            onChangeText={(text) => {
                if (!isNaN(Number(text))) {
                    props.team2(text);
                } else {
                    props.team2("");
                }
            }}
        />
    </View>
);
}

const styles = StyleSheet.create({
  input: {
    height: 100,
    width: 100,
    textAlign: "center",
    fontSize: 96,
  },
});
