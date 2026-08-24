import clsx from "clsx";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

type AuthFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoComplete?: TextInputProps["autoComplete"];
  textContentType?: TextInputProps["textContentType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  editable?: boolean;
  returnKeyType?: TextInputProps["returnKeyType"];
  onSubmitEditing?: TextInputProps["onSubmitEditing"];
};

const AuthField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType,
  autoComplete,
  textContentType,
  autoCapitalize = "none",
  editable = true,
  returnKeyType,
  onSubmitEditing,
}: AuthFieldProps) => {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View className="auth-field">
      <Text className="auth-label">{label}</Text>
      <View className="auth-input-wrap">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          style={{ paddingLeft: 12 }}
          className={clsx(
            "auth-input",
            secureTextEntry && "auth-input-secure",
            error && "auth-input-error",
          )}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          editable={editable}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
        {secureTextEntry ? (
          <Pressable
            className="auth-input-toggle"
            onPress={() => setHidden((current) => !current)}
            hitSlop={8}
          >
            <Text className="auth-input-toggle-text">{hidden ? "Show" : "Hide"}</Text>
          </Pressable>
        ) : null}
      </View>
      {error ? <Text className="auth-error">{error}</Text> : null}
    </View>
  );
};

export default AuthField;
