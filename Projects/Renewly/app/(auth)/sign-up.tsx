import AuthButton from "@/components/auth/AuthButton";
import AuthField from "@/components/auth/AuthField";
import AuthFooterLink from "@/components/auth/AuthFooterLink";
import AuthScreen from "@/components/auth/AuthScreen";
import VerificationStep from "@/components/auth/VerificationStep";
import { clerkErrorMessage, clerkFieldMessage, clerkFormMessage } from "@/lib/auth/errors";
import {
  validateCode,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordMatch,
} from "@/lib/auth/validation";
import { useSignUp } from "@clerk/expo";
import { useState } from "react";
import { Text, View } from "react-native";

type SignUpStep = "details" | "verify";

const SignUp = () => {
  const { signUp, errors, fetchStatus } = useSignUp();
  const [step, setStep] = useState<SignUpStep>("details");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    code?: string;
  }>({});
  const [formError, setFormError] = useState<string | undefined>();
  const loading = fetchStatus === "fetching";

  const maybeVerifyEmail = async () => {
    if (signUp.status === "complete") {
      const { error } = await signUp.finalize();
      if (error) setFormError(clerkErrorMessage(error));
      return;
    }

    if (
      signUp.status === "missing_requirements" &&
      signUp.unverifiedFields.includes("email_address")
    ) {
      const { error } = await signUp.verifications.sendEmailCode();
      if (error) {
        setFormError(clerkErrorMessage(error));
        return;
      }
      setStep("verify");
      return;
    }

    setFormError("We need a bit more information to finish creating your account.");
  };

  const onCreateAccount = async () => {
    const nextErrors = {
      firstName: validateName(firstName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validatePasswordMatch(password, confirmPassword),
    };
    setFieldErrors(nextErrors);
    setFormError(undefined);
    if (Object.values(nextErrors).some(Boolean)) return;

    const { error } = await signUp.password({
      emailAddress: email.trim(),
      password,
      firstName: firstName.trim(),
    });
    if (error) {
      setFieldErrors({
        firstName: clerkFieldMessage(errors, "firstName"),
        email: clerkFieldMessage(errors, "emailAddress"),
        password: clerkFieldMessage(errors, "password"),
        confirmPassword: nextErrors.confirmPassword,
      });
      setFormError(clerkFormMessage(errors) ?? clerkErrorMessage(error));
      return;
    }

    await maybeVerifyEmail();
  };

  const onVerify = async () => {
    const codeError = validateCode(code);
    setFieldErrors({ code: codeError });
    setFormError(undefined);
    if (codeError) return;

    const { error } = await signUp.verifications.verifyEmailCode({ code: code.trim() });
    if (error) {
      setFieldErrors({ code: clerkFieldMessage(errors, "code") });
      setFormError(clerkFormMessage(errors) ?? clerkErrorMessage(error));
      return;
    }

    if (signUp.status === "complete") {
      const { error: finalizeError } = await signUp.finalize();
      if (finalizeError) setFormError(clerkErrorMessage(finalizeError));
    }
  };

  const onResend = async () => {
    setFormError(undefined);
    const { error } = await signUp.verifications.sendEmailCode();
    if (error) setFormError(clerkErrorMessage(error));
  };

  const onBack = async () => {
    await signUp.reset();
    setStep("details");
    setCode("");
    setFormError(undefined);
    setFieldErrors({});
  };

  if (step === "verify") {
    return (
      <AuthScreen>
        <VerificationStep
          title="Verify your email"
          subtitle={`We sent a 6-digit code to ${email.trim()}. Enter it to finish setting up Renewly.`}
          code={code}
          onChangeCode={setCode}
          error={fieldErrors.code}
          formError={formError}
          loading={loading}
          onVerify={onVerify}
          onResend={onResend}
          onBack={onBack}
        />
      </AuthScreen>
    );
  }

  return (
    <AuthScreen>
      <View className="items-center">
        <Text className="auth-title">Create your account</Text>
        <Text className="auth-subtitle">
          Start tracking renewals, upcoming bills, and what you actually use.
        </Text>
      </View>

      <View className="auth-card">
        <View className="auth-form">
          <AuthField
            label="First name"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Alex"
            error={fieldErrors.firstName}
            autoCapitalize="words"
            autoComplete="given-name"
            textContentType="givenName"
            returnKeyType="next"
          />
          <AuthField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@email.com"
            error={fieldErrors.email}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
          />
          <AuthField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            error={fieldErrors.password}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="next"
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
            onSubmitEditing={onCreateAccount}
          />
          {formError ? <Text className="auth-error">{formError}</Text> : null}
          <AuthButton title="Create account" onPress={onCreateAccount} loading={loading} />
          <View nativeID="clerk-captcha" collapsable={false} />
        </View>
      </View>

      <AuthFooterLink
        prompt="Already have an account?"
        label="Sign in"
        href="/(auth)/sign-in"
      />
    </AuthScreen>
  );
};

export default SignUp;
