import { TouchableOpacity, Text, View } from "react-native";
import { colorPallet } from "./ColorPallet";

type ButtonProps = {
  type?: "primaryButton" | "secondaryButton";
  text?: string;
  onPress: () => void;
  style?: any;
  children?: React.ReactNode;
  icon?: string;
};

export function Button(props: ButtonProps) {
  let backgroundColor = colorPallet.primary;
  let color = colorPallet.onPrimary;

  if (props.type === "primaryButton") {
    backgroundColor = colorPallet.primary;
    color = colorPallet.onPrimary;
  } else if (props.type === "secondaryButton") {
    backgroundColor = colorPallet.secondary;
    color = colorPallet.text;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 200,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        ...props.style,
      }}
      onPress={props.onPress}
    >
      {props.children && <View style={props.text ? {marginRight: 8} : {}}>{props.children}</View>}
      {props.text && (
        <Text
          style={{ color: color, fontFamily: "Nohemi-Regular", fontSize: 16 }}
        >
          {props.text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
