import AuthButton from "@/components/auth/AuthButton";
import AuthField from "@/components/auth/AuthField";
import AuthFooterLink from "@/components/auth/AuthFooterLink";
import AuthScreen from "@/components/auth/AuthScreen";
import VerificationStep from "@/components/auth/VerificationStep";
import { clerkErrorMessage, clerkFieldMessage, clerkFormMessage } from "@/lib/auth/errors";
import { validateCode, validateEmail, validatePassword } from "@/lib/auth/validation";
import { useSignIn } from "@clerk/expo";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

type SignInStep = "credentials" | "verify";

const SignIn = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const [step, setStep] = useState<SignInStep>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    code?: string;
  }>({});
  const [formError, setFormError] = useState<string | undefined>();
  const loading = fetchStatus === "fetching";

  const continueAfterPassword = async () => {
    if (signIn.status === "complete") {
      const { error } = await signIn.finalize();
      if (error) setFormError(clerkErrorMessage(error));
      return;
    }

    if (signIn.status === "needs_client_trust") {
      const { error } = await signIn.mfa.sendEmailCode();
      if (error) {
        setFormError(clerkErrorMessage(error));
        return;
      }
      setStep("verify");
      return;
    }

    if (signIn.status === "needs_second_factor") {
      const emailFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );
      if (!emailFactor) {
        setFormError(
          "This account needs another verification step that isn’t available here yet.",
        );
        return;
      }
      const { error } = await signIn.mfa.sendEmailCode();
      if (error) {
        setFormError(clerkErrorMessage(error));
        return;
      }
      setStep("verify");
      return;
    }

    setFormError("We couldn’t finish signing you in. Check your details and try again.");
  };

  const onSignIn = async () => {
    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setFieldErrors(nextErrors);
    setFormError(undefined);
    if (nextErrors.email || nextErrors.password) return;

    const { error } = await signIn.password({
      emailAddress: email.trim(),
      password,
    });
    if (error) {
      setFieldErrors({
        email: clerkFieldMessage(errors, "identifier"),
        password: clerkFieldMessage(errors, "password"),
      });
      setFormError(clerkFormMessage(errors) ?? clerkErrorMessage(error));
      return;
    }

    await continueAfterPassword();
  };

  const onVerify = async () => {
    const codeError = validateCode(code);
    setFieldErrors({ code: codeError });
    setFormError(undefined);
    if (codeError) return;

    const { error } = await signIn.mfa.verifyEmailCode({ code: code.trim() });
    if (error) {
      setFieldErrors({ code: clerkFieldMessage(errors, "code") });
      setFormError(clerkFormMessage(errors) ?? clerkErrorMessage(error));
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) setFormError(clerkErrorMessage(finalizeError));
    }
  };

  const onResend = async () => {
    setFormError(undefined);
    const { error } = await signIn.mfa.sendEmailCode();
    if (error) setFormError(clerkErrorMessage(error));
  };

  const onBack = async () => {
    await signIn.reset();
    setStep("credentials");
    setCode("");
    setFormError(undefined);
    setFieldErrors({});
  };

  if (step === "verify") {
    return (
      <AuthScreen>
        <VerificationStep
          title="Check your email"
          subtitle={`Enter the code we sent to ${email.trim()} to confirm this device.`}
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
        <Text className="auth-title">Welcome back</Text>
        <Text className="auth-subtitle">
          Sign in to keep managing your subscriptions in one place.
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
            returnKeyType="next"
          />
          <AuthField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            error={fieldErrors.password}
            secureTextEntry
            autoComplete="password"
            textContentType="password"
            returnKeyType="done"
            onSubmitEditing={onSignIn}
          />
          <Link href="/(auth)/forgot-password" className="auth-forgot-link">
            <Text className="auth-link">Forgot password?</Text>
          </Link>
          {formError ? <Text className="auth-error">{formError}</Text> : null}
          <AuthButton title="Sign in" onPress={onSignIn} loading={loading} />
        </View>
      </View>

      <AuthFooterLink
        prompt="New to Renewly?"
        label="Create an account"
        href="/(auth)/sign-up"
      />
    </AuthScreen>
  );
};

export default SignIn;
