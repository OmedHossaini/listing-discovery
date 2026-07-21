import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import TextField from '../components/TextField';
import CategoryPicker from '../components/CategoryPicker';
import PrimaryButton from '../components/PrimaryButton';
import { useBusinesses } from '../BusinessContext';
import { CATEGORIES } from '../business';
import { colors } from '../theme';

export default function CreateListingScreen() {
  const { addBusiness } = useBusinesses();
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;
    addBusiness(name.trim(), category, description.trim());
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TextField
        label="Business name"
        value={name}
        onChangeText={setName}
        placeholder="e.g. Cafe Sainte-Catherine"
      />
      <CategoryPicker value={category} onChange={setCategory} />
      <TextField
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="What does this business do?"
        multiline
      />
      <PrimaryButton label="Save listing" onPress={handleSubmit} disabled={!name.trim()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background },
});