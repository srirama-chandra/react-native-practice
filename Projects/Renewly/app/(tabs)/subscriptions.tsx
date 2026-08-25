import SubscriptionCard from '@/components/SubscriptionCard';
import { HOME_SUBSCRIPTIONS } from '@/constants/data';
import { colors } from '@/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from 'nativewind';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

const SafeAreaView = styled(RNSafeAreaView);

const subscriptionMatchesQuery = (subscription: Subscription, query: string) => {
  const haystack = [
    subscription.name,
    subscription.plan,
    subscription.category,
    subscription.billing,
    subscription.paymentMethod,
    subscription.status,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
};

const Subscriptions = () => {
  const [query, setQuery] = useState('');
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredSubscriptions = useMemo(() => {
    if (!normalizedQuery) return HOME_SUBSCRIPTIONS;
    return HOME_SUBSCRIPTIONS.filter((item) =>
      subscriptionMatchesQuery(item, normalizedQuery),
    );
  }, [normalizedQuery]);

  useEffect(() => {
    if (
      expandedSubscriptionId &&
      !filteredSubscriptions.some((item) => item.id === expandedSubscriptionId)
    ) {
      setExpandedSubscriptionId(null);
    }
  }, [expandedSubscriptionId, filteredSubscriptions]);

  const resultLabel = normalizedQuery
    ? `${filteredSubscriptions.length} result${filteredSubscriptions.length === 1 ? '' : 's'}`
    : `${HOME_SUBSCRIPTIONS.length} subscription${HOME_SUBSCRIPTIONS.length === 1 ? '' : 's'}`;

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="subs-title">Subscriptions</Text>

      <View className="subs-search">
        <Ionicons name="search" size={20} color={colors.mutedForeground} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search subscriptions"
          placeholderTextColor="rgba(0, 0, 0, 0.4)"
          className="subs-search-input"
          style={{ paddingLeft: 8 }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          accessibilityLabel="Search subscriptions"
        />
        {query.length > 0 ? (
          <Pressable
            className="subs-search-clear"
            onPress={() => setQuery('')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Text className="subs-search-clear-text">Clear</Text>
          </Pressable>
        ) : null}
      </View>

      <Text className="subs-count">{resultLabel}</Text>

      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-20"
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptionId === item.id}
            onPress={() =>
              setExpandedSubscriptionId((currentId) =>
                currentId === item.id ? null : item.id,
              )
            }
          />
        )}
        ListEmptyComponent={
          <Text className="home-empty-state">
            {normalizedQuery
              ? `No subscriptions match “${query.trim()}”`
              : 'No Subscriptions Yet'}
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Subscriptions;
