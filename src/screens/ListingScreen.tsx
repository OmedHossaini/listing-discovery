import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import BusinessCard from '../components/BusinessCard';
import { useBusinesses } from '../BusinessContext';
import { colors } from '../theme';
import SearchBar from '../components/SearchBar';
import { filterBusinesses } from '../filterBusinesses';

export default function ListingsScreen() {
  const { businesses, isLoading } = useBusinesses();
  const [query, setQuery] = useState('');

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  const visible = filterBusinesses(businesses, query);
  const emptyMessage =
      businesses.length === 0
      ? 'No listings yet. Tap + to add one.'
      : 'No businesses match your search.';

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />
      <FlatList
        data={visible}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BusinessCard business={item} />}
        ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { marginTop: 40, textAlign: 'center', color: colors.muted, fontSize: 15 },
});