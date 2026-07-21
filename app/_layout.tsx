import { Pressable, Text } from 'react-native';
import { Stack, router } from 'expo-router';
import { BusinessProvider } from '../src/BusinessContext';
import { colors } from '../src/theme';

export default function RootLayout() {
  return (
    <BusinessProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Businesses',
            headerRight: () => (
              <Pressable onPress={() => router.push('/create')} hitSlop={12}>
                <Text style={{ fontSize: 28, color: colors.accent }}>+</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen name="create" options={{ title: 'New listing' }} />
      </Stack>
    </BusinessProvider>
  );
}