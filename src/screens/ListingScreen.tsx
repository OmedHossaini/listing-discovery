import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import BusinessCard from '../components/BusinessCard';
import { useBusinesses } from '../BusinessContext';
import { colors } from '../theme';

export default function ListingsScreen() {
  const { businesses, isLoading } = useBusinesses();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BusinessCard business={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No listings yet. Tap + to add one.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { marginTop: 40, textAlign: 'center', color: colors.muted, fontSize: 15 },
});