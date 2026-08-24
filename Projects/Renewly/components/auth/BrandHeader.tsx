import { Text, View } from "react-native";

const BrandHeader = () => {
  return (
    <View className="auth-brand-block">
      <View className="auth-logo-wrap">
        <View className="auth-logo-mark">
          <Text className="auth-logo-mark-text">R</Text>
        </View>
        <View>
          <Text className="auth-wordmark">Renewly</Text>
          <Text className="auth-wordmark-sub">Subscription tracker</Text>
        </View>
      </View>
    </View>
  );
};

export default BrandHeader;
