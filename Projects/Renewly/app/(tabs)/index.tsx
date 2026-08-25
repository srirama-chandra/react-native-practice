import CreateSubscriptionModal from '@/components/CreateSubscriptionModal';
import ListHeading from '@/components/ListHeading';
import SubscriptionCard from '@/components/SubscriptionCard';
import UpcomingSubscriptionCard from '@/components/UpcomingSubscriptionCard';
import { HOME_BALANCE, HOME_SUBSCRIPTIONS, UPCOMING_SUBSCRIPTIONS } from '@/constants/data';
import { icons } from '@/constants/icons';
import images from '@/constants/images';
import { formatCurrency } from '@/lib/utils/utils';
import { useUser } from '@clerk/expo';
import dayjs from 'dayjs';
import { styled } from 'nativewind';
import { useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const { user } = useUser();
  const displayName = user?.firstName || user?.fullName || 'there';

  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(HOME_SUBSCRIPTIONS);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const handleCreateSubscription = (subscription: Subscription) => {
    setSubscriptions((current) => [subscription, ...current]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-5">


      <View>
        <FlatList
          ListHeaderComponent={(
            <>
              <View className='home-header'>
                <View className='home-user'>
                  <Image source={images.avatar} className='home-avatar' />
                  <Text className='home-user-name'>{displayName}</Text>
                </View>

                <Pressable
                  onPress={() => setIsCreateModalVisible(true)}
                  hitSlop={8}
                  accessibilityRole='button'
                  accessibilityLabel='Add subscription'
                >
                  <Image source={icons.add} className='home-add-icon' />
                </Pressable>
              </View>

              <View className='home-balance-card'>
                <Text className='home-balance-label'>Balance</Text>

                <View className='home-balance-row'>
                  <Text className='home-balance-amount'>
                    {formatCurrency(HOME_BALANCE.amount)}
                  </Text>
                  <Text className='home-balance-date'>{dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}</Text>
                </View>
              </View>

              <View className='mb-5'>
                <ListHeading title='Upcoming' />
                <FlatList
                  data={UPCOMING_SUBSCRIPTIONS}
                  renderItem={({ item }) => (
                    <UpcomingSubscriptionCard {...item} />
                  )}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={<Text className='home-empty-state'>No Upcoming Renewals Yet</Text>}
                />
              </View>

              <ListHeading title='All Subscriptions' />
            </>
          )}
          data={subscriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubscriptionCard
              {...item}
              expanded={expandedSubscriptionId === item.id}
              onPress={() => setExpandedSubscriptionId((currentId) => (
                currentId === item.id ? null : item.id
              ))}
            />
          )}
          ItemSeparatorComponent={() => <View className='h-4'></View>}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text className='home-empty-state'>No Subscriptions Yet</Text>}
          contentContainerClassName='pb-20'
        />
      </View>

      <CreateSubscriptionModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreate={handleCreateSubscription}
      />
    </SafeAreaView>
  );
}