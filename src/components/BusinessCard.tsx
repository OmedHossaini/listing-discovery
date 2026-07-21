import { StyleSheet, Text, View } from 'react-native';
import { Business } from '../business';
import { colors } from '../theme';

export default function BusinessCard({ business }: { business: Business }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{business.name}</Text>
      <Text style={styles.category}>{business.category}</Text>
      {business.description ? (
        <Text style={styles.description}>{business.description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  name: { fontSize: 17, fontWeight: '600', color: colors.text },
  category: { fontSize: 12, fontWeight: '600', color: colors.accent, marginTop: 4 },
  description: { fontSize: 15, color: colors.muted, marginTop: 8, lineHeight: 21 },
});