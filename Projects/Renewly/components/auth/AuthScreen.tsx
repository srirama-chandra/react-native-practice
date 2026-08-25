import BrandHeader from "@/components/auth/BrandHeader";
import { styled } from "nativewind";
import { type ReactNode } from "react";
import { KeyboardAwareScrollView as RNKeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
const KeyboardAwareScrollView = styled(RNKeyboardAwareScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

type AuthScreenProps = {
  children: ReactNode;
};

const AuthScreen = ({ children }: AuthScreenProps) => {
  return (
    <SafeAreaView className="auth-safe-area">
      <KeyboardAwareScrollView
        className="auth-scroll"
        contentContainerClassName="auth-content"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={24}
      >
        <BrandHeader />
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;
