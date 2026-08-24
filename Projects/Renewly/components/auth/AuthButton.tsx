import clsx from "clsx";
import { selectionAsync } from "expo-haptics";
import { ActivityIndicator, Pressable, Text } from "react-native";

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const AuthButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
}: AuthButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={clsx("auth-button", isDisabled && "auth-button-disabled")}
      onPress={() => {
        if (isDisabled) return;
        selectionAsync();
        onPress();
      }}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color="#081126" />
      ) : (
        <Text className="auth-button-text">{title}</Text>
      )}
    </Pressable>
  );
};

export default AuthButton;
