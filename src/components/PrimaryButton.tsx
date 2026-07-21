import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ label, onPress, disabled }: Props) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabled: { opacity: 0.4 },
  label: { color: '#fff', fontSize: 16, fontWeight: '600' },
});