import AuthButton from "@/components/auth/AuthButton";
import AuthField from "@/components/auth/AuthField";
import AuthFooterLink from "@/components/auth/AuthFooterLink";
import AuthScreen from "@/components/auth/AuthScreen";
import VerificationStep from "@/components/auth/VerificationStep";
import { clerkErrorMessage, clerkFieldMessage, clerkFormMessage } from "@/lib/auth/errors";
import {
  validateCode,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "@/lib/auth/validation";
import { useSignIn } from "@clerk/expo";
import { useState } from "react";
import { Text, View } from "react-native";

type ResetStep = "email" | "code" | "password";

const ForgotPassword = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    code?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [formError, setFormError] = useState<string | undefined>();
  const loading = fetchStatus === "fetching";

  const onSendCode = async () => {
    const emailError = validateEmail(email);
    setFieldErrors({ email: emailError });
    setFormError(undefined);
    if (emailError) return;

    const { error: createError } = await signIn.create({
      identifier: email.trim(),
    });
    if (createError) {
      setFieldErrors({ email: clerkFieldMessage(errors, "identifier") });
      setFormError(clerkFormMessage(errors) ?? clerkErrorMessage(createError));
      return;
    }

    const { error } = await signIn.resetPasswordEmailCode.sendCode();
    if (error) {
      setFormError(clerkFormMessage(errors) ?? clerkErrorMessage(error));
      return;
    }

    setStep("code");
  };

  const onVerifyCode = async () => {
    const codeError = validateCode(code);
    setFieldErrors({ code: codeError });
    setFormError(undefined);
    if (codeError) return;

    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code: code.trim(),
    });
    if (error) {
      setFieldErrors({ code: clerkFieldMessage(errors, "code") });
      setFormError(clerkFormMessage(errors) ?? clerkErrorMessage(error));
      return;
    }

    setStep("password");
  };

  const onResend = async () => {
    setFormError(undefined);
    const { error } = await signIn.resetPasswordEmailCode.sendCode();
    if (error) setFormError(clerkErrorMessage(error));
  };

  const onSubmitPassword = async () => {
    const nextErrors = {
      password: validatePassword(password, "New password"),
      confirmPassword: validatePasswordMatch(password, confirmPassword),
    };
    setFieldErrors(nextErrors);
    setFormError(undefined);
    if (nextErrors.password || nextErrors.confirmPassword) return;

    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password,
      signOutOfOtherSessions: true,
    });
    if (error) {
      setFieldErrors({ password: clerkFieldMessage(errors, "password") });
      setFormError(clerkFormMessage(errors) ?? clerkErrorMessage(error));
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) setFormError(clerkErrorMessage(finalizeError));
    }
  };

  const onBackToEmail = async () => {
    await signIn.reset();
    setStep("email");
    setCode("");
    setPassword("");
    setConfirmPassword("");
    setFormError(undefined);
    setFieldErrors({});
  };

  if (step === "code") {
    return (
      <AuthScreen>
        <VerificationStep
          title="Check your inbox"
          subtitle={`Enter the reset code we sent to ${email.trim()}.`}
          code={code}
          onChangeCode={setCode}
          error={fieldErrors.code}
          formError={formError}
          loading={loading}
          onVerify={onVerifyCode}
          onResend={onResend}
          onBack={onBackToEmail}
        />
      </AuthScreen>
    );
  }

  if (step === "password") {
    return (
      <AuthScreen>
        <View className="items-center">
          <Text className="auth-title">Set a new password</Text>
          <Text className="auth-subtitle">
            Choose a password you’ll remember. You’ll stay signed in on this device.
          </Text>
        </View>

        <View className="auth-card">
          <View className="auth-form">
            <AuthField
              label="New password"
              value={password}
              onChangeText={setPassword}
              placeholder="At least 8 characters"
              error={fieldErrors.password}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
            />
            <AuthField
              label="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter your password"
              error={fieldErrors.confirmPassword}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
              returnKeyType="done"
              onSubmitEditing={onSubmitPassword}
            />
            {formError ? <Text className="auth-error">{formError}</Text> : null}
            <AuthButton title="Update password" onPress={onSubmitPassword} loading={loading} />
          </View>
        </View>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen>
      <View className="items-center">
        <Text className="auth-title">Forgot password?</Text>
        <Text className="auth-subtitle">
          Enter the email on your Renewly account and we’ll send a reset code.
        </Text>
      </View>

      <View className="auth-card">
        <View className="auth-form">
          <AuthField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@email.com"
            error={fieldErrors.email}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="done"
            onSubmitEditing={onSendCode}
          />
          {formError ? <Text className="auth-error">{formError}</Text> : null}
          <AuthButton title="Send reset code" onPress={onSendCode} loading={loading} />
        </View>
      </View>

      <AuthFooterLink prompt="Remembered it?" label="Back to sign in" href="/(auth)/sign-in" />
    </AuthScreen>
  );
};

export default ForgotPassword;
