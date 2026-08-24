import { Link, type Href } from "expo-router";
import { Text, View } from "react-native";

type AuthFooterLinkProps = {
  prompt: string;
  label: string;
  href: Href;
};

const AuthFooterLink = ({ prompt, label, href }: AuthFooterLinkProps) => {
  return (
    <View className="auth-link-row">
      <Text className="auth-link-copy">{prompt} </Text>
      <Link href={href}>
        <Text className="auth-link">{label}</Text>
      </Link>
    </View>
  );
};

export default AuthFooterLink;
