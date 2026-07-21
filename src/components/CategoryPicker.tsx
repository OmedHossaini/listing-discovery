import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIES } from '../business';
import { colors } from '../theme';

type Props = {
  value: string;
  onChange: (category: string) => void;
};

export default function CategoryPicker({ value, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {CATEGORIES.map((category) => {
          const selected = category === value;
          return (
            <Pressable
              key={category}
              onPress={() => onChange(category)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: colors.text },
  row: { flexDirection: 'row', gap: 8 },
  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  chipSelected: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { fontSize: 14, color: colors.muted },
  chipTextSelected: { color: '#fff', fontWeight: '600' },
});