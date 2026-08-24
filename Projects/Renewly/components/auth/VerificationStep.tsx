import AuthButton from "@/components/auth/AuthButton";
import AuthField from "@/components/auth/AuthField";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

type VerificationStepProps = {
  title: string;
  subtitle: string;
  code: string;
  onChangeCode: (value: string) => void;
  error?: string;
  formError?: string;
  loading: boolean;
  onVerify: () => void;
  onResend: () => void;
  onBack?: () => void;
  backLabel?: string;
};

const RESEND_SECONDS = 30;

const VerificationStep = ({
  title,
  subtitle,
  code,
  onChangeCode,
  error,
  formError,
  loading,
  onVerify,
  onResend,
  onBack,
  backLabel = "Use a different email",
}: VerificationStepProps) => {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <>
      <View className="items-center">
        <Text className="auth-title">{title}</Text>
        <Text className="auth-subtitle">{subtitle}</Text>
      </View>

      <View className="auth-card">
        <View className="auth-form">
          <AuthField
            label="Verification code"
            value={code}
            onChangeText={onChangeCode}
            placeholder="6-digit code"
            error={error}
            keyboardType="number-pad"
            autoComplete="one-time-code"
            textContentType="oneTimeCode"
            returnKeyType="done"
            onSubmitEditing={onVerify}
          />
          {formError ? <Text className="auth-error">{formError}</Text> : null}
          <AuthButton title="Verify" onPress={onVerify} loading={loading} />
          <Pressable
            className="auth-secondary-button"
            disabled={secondsLeft > 0 || loading}
            onPress={() => {
              setSecondsLeft(RESEND_SECONDS);
              onResend();
            }}
          >
            <Text className="auth-secondary-button-text">
              {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : "Resend code"}
            </Text>
          </Pressable>
          {onBack ? (
            <Pressable onPress={onBack} hitSlop={8}>
              <Text className="auth-link text-center">{backLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default VerificationStep;
