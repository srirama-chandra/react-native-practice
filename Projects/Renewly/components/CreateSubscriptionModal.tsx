import { icons } from "@/constants/icons";
import clsx from "clsx";
import dayjs from "dayjs";
import { selectionAsync } from "expo-haptics";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const FREQUENCIES: SubscriptionFrequency[] = ["Monthly", "Yearly"];

const CATEGORIES: SubscriptionCategory[] = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
];

const CATEGORY_COLORS: Record<SubscriptionCategory, string> = {
  Entertainment: "#f3c4c4",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#f5c542",
  Productivity: "#c9e4de",
  Cloud: "#cfe0f5",
  Music: "#b8e8d0",
  Other: "#f6eecf",
};

const DEFAULT_FREQUENCY: SubscriptionFrequency = "Monthly";
const DEFAULT_CATEGORY: SubscriptionCategory = "Entertainment";

const validateSubscriptionName = (value: string): string | undefined => {
  if (!value.trim()) return "Enter a subscription name.";
  return undefined;
};

const validateSubscriptionPrice = (value: string): string | undefined => {
  const price = value.trim();
  if (!price) return "Enter a price.";
  const parsed = Number(price);
  if (!Number.isFinite(parsed)) return "Enter a valid price.";
  if (parsed <= 0) return "Price must be greater than 0.";
  return undefined;
};

const createSubscriptionId = () =>
  `sub-${dayjs().valueOf()}-${Math.random().toString(36).slice(2, 8)}`;

const CreateSubscriptionModal = ({
  visible,
  onClose,
  onCreate,
}: CreateSubscriptionModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<SubscriptionFrequency>(DEFAULT_FREQUENCY);
  const [category, setCategory] = useState<SubscriptionCategory>(DEFAULT_CATEGORY);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    price?: string;
  }>({});

  const canSubmit = Boolean(name.trim()) && Boolean(price.trim());

  const resetForm = () => {
    setName("");
    setPrice("");
    setFrequency(DEFAULT_FREQUENCY);
    setCategory(DEFAULT_CATEGORY);
    setFieldErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    const nextErrors = {
      name: validateSubscriptionName(name),
      price: validateSubscriptionPrice(price),
    };
    setFieldErrors(nextErrors);
    if (nextErrors.name || nextErrors.price) return;

    const startDate = dayjs();
    const renewalDate = startDate.add(1, frequency === "Yearly" ? "year" : "month");

    onCreate({
      id: createSubscriptionId(),
      name: name.trim(),
      price: Number(price.trim()),
      frequency,
      category,
      status: "active",
      startDate: startDate.toISOString(),
      renewalDate: renewalDate.toISOString(),
      icon: icons.wallet,
      billing: frequency,
      color: CATEGORY_COLORS[category],
    });

    selectionAsync();
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        className="modal-overlay"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Pressable
          className="absolute top-0 right-0 bottom-0 left-0"
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss new subscription form"
        />

        <View className="modal-container">
          <View className="modal-header">
            <Text className="modal-title">New Subscription</Text>

            <Pressable
              className="modal-close"
              onPress={handleClose}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text className="modal-close-text">✕</Text>
            </Pressable>
          </View>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View className="modal-body">
              <View className="auth-field">
                <Text className="auth-label">Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Netflix"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  style={{ paddingLeft: 12 }}
                  className={clsx("auth-input", fieldErrors.name && "auth-input-error")}
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="next"
                />
                {fieldErrors.name ? (
                  <Text className="auth-error">{fieldErrors.name}</Text>
                ) : null}
              </View>

              <View className="auth-field">
                <Text className="auth-label">Price</Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  placeholder="9.99"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  style={{ paddingLeft: 12 }}
                  className={clsx("auth-input", fieldErrors.price && "auth-input-error")}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
                {fieldErrors.price ? (
                  <Text className="auth-error">{fieldErrors.price}</Text>
                ) : null}
              </View>

              <View className="auth-field">
                <Text className="auth-label">Frequency</Text>
                <View className="picker-row">
                  {FREQUENCIES.map((option) => {
                    const active = option === frequency;

                    return (
                      <Pressable
                        key={option}
                        className={clsx("picker-option", active && "picker-option-active")}
                        onPress={() => setFrequency(option)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: active }}
                      >
                        <Text
                          className={clsx(
                            "picker-option-text",
                            active && "picker-option-text-active",
                          )}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View className="auth-field">
                <Text className="auth-label">Category</Text>
                <View className="category-scroll">
                  {CATEGORIES.map((option) => {
                    const active = option === category;

                    return (
                      <Pressable
                        key={option}
                        className={clsx("category-chip", active && "category-chip-active")}
                        onPress={() => setCategory(option)}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: active }}
                      >
                        <Text
                          className={clsx(
                            "category-chip-text",
                            active && "category-chip-text-active",
                          )}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <Pressable
                className={clsx("auth-button", !canSubmit && "auth-button-disabled")}
                onPress={handleSubmit}
                disabled={!canSubmit}
              >
                <Text className="auth-button-text">Add Subscription</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateSubscriptionModal;
