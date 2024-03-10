import { TouchableOpacity, Text, View } from "react-native";
import { colorPallet } from "../../utils/ColorPallet";
import React from "react";

type ButtonProps = {
  type?: "primaryButton" | "secondaryButton" | "tertiaryButton";
  text?: string;
  onPress?: () => void;
  style?: any;
  children?: React.ReactNode;
};

//  This component uses the `forwardRef` function to allow the parent component to access the underlying `TouchableOpacity` ref.
const Button = React.forwardRef(
  ({ type, text, onPress, children, style }: ButtonProps, ref: any) => {
    let backgroundColor = "";
    let color = colorPallet.onPrimary;

    if (type === "primaryButton") {
      backgroundColor = colorPallet.primary;
      color = colorPallet.onPrimary;
    } else if (type === "secondaryButton") {
      backgroundColor = colorPallet.secondary;
      color = colorPallet.text;
    } else if (type === "tertiaryButton") {
      backgroundColor = "transparent";
      color = colorPallet.text;
    }

    return (
      <TouchableOpacity
        ref={ref}
        style={{
          backgroundColor: backgroundColor,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 200,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          ...style,
        }}
        onPress={onPress}
      >
        {children && (
          <View style={text ? { marginRight: 8 } : {}}>{children}</View>
        )}
        {text && <Text style={{ color: color, fontSize: 16 }}>{text}</Text>}
      </TouchableOpacity>
    );
  }
);

export default Button;
