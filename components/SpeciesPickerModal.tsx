import React, { useMemo, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, Image, Alert, FlatList, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { mushrooms, Mushroom } from '../data/mushrooms';
import { colors, edibilityColor, fonts, radius } from '../theme/colors';

export default function SpeciesPickerModal({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (mushroom: Mushroom, note: string, photoUri?: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Mushroom | null>(null);
  const [note, setNote] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  const results = useMemo(
    () => mushrooms.filter((m) => m.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const reset = () => {
    setQuery('');
    setSelected(null);
    setNote('');
    setPhotoUri(undefined);
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak dostępu', 'Potrzebujemy dostępu do aparatu, żeby zrobić zdjęcie.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const pickFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak dostępu', 'Potrzebujemy dostępu do galerii, żeby wybrać zdjęcie.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6, mediaTypes: ['images'] });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const handleAddPhoto = () => {
    Alert.alert('Dodaj zdjęcie', undefined, [
      { text: 'Aparat', onPress: pickFromCamera },
      { text: 'Galeria', onPress: pickFromLibrary },
      { text: 'Anuluj', style: 'cancel' },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Nowe znalezisko</Text>

          {!selected ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Szukaj gatunku..."
                placeholderTextColor={colors.textMuted}
                value={query}
                onChangeText={setQuery}
              />
              <FlatList
                data={results}
                keyExtractor={(m) => m.id}
                style={styles.list}
                renderItem={({ item }) => (
                  <Pressable style={styles.row} onPress={() => setSelected(item)}>
                    <View style={[styles.dot, { backgroundColor: edibilityColor[item.edibility] }]} />
                    <View>
                      <Text style={styles.rowName}>{item.name}</Text>
                      <Text style={styles.rowLatin}>{item.latinName}</Text>
                    </View>
                  </Pressable>
                )}
              />
            </>
          ) : (
            <>
              <View style={styles.selectedRow}>
                <View style={[styles.dot, { backgroundColor: edibilityColor[selected.edibility] }]} />
                <Text style={styles.rowName}>{selected.name}</Text>
                <Pressable onPress={() => setSelected(null)}>
                  <Text style={styles.change}>Zmień</Text>
                </Pressable>
              </View>
              {photoUri ? (
                <View style={styles.photoPreviewWrap}>
                  <Image source={{ uri: photoUri }} style={styles.photoPreview} />
                  <Pressable style={styles.photoRemove} onPress={() => setPhotoUri(undefined)}>
                    <Ionicons name="close" size={16} color={colors.text} />
                  </Pressable>
                </View>
              ) : (
                <Pressable style={styles.photoButton} onPress={handleAddPhoto}>
                  <Ionicons name="camera-outline" size={18} color={colors.sage} />
                  <Text style={styles.photoButtonText}>Dodaj zdjęcie</Text>
                </Pressable>
              )}
              <TextInput
                style={[styles.input, styles.noteInput]}
                placeholder="Notatka (opcjonalnie)..."
                placeholderTextColor={colors.textMuted}
                value={note}
                onChangeText={setNote}
                multiline
              />
              <Pressable
                style={styles.saveButton}
                onPress={() => {
                  onSave(selected, note, photoUri);
                  reset();
                }}
              >
                <Text style={styles.saveText}>Zapisz znalezisko</Text>
              </Pressable>
            </>
          )}

          <Pressable
            style={styles.cancel}
            onPress={() => {
              reset();
              onClose();
            }}
          >
            <Text style={styles.cancelText}>Anuluj</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: 20,
    maxHeight: '80%',
  },
  title: { fontSize: 20, fontFamily: fonts.heading, color: colors.text, marginBottom: 12 },
  input: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: fonts.body,
    color: colors.text,
    marginBottom: 10,
  },
  noteInput: { minHeight: 70, textAlignVertical: 'top' },
  list: { maxHeight: 320 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  selectedRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  rowName: { fontSize: 15, fontFamily: fonts.bodyMedium, color: colors.text, flex: 1 },
  rowLatin: { fontSize: 12, fontFamily: fonts.body, fontStyle: 'italic', color: colors.textMuted },
  change: { fontSize: 13, fontFamily: fonts.bodyMedium, color: colors.sage },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.md,
    paddingVertical: 12,
    marginBottom: 10,
  },
  photoButtonText: { fontFamily: fonts.bodyMedium, color: colors.sage, fontSize: 14 },
  photoPreviewWrap: { marginBottom: 10 },
  photoPreview: { width: '100%', height: 140, borderRadius: radius.md },
  photoRemove: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 4,
  },
  saveButton: {
    backgroundColor: colors.forestMuted,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  saveText: { fontFamily: fonts.bodyBold, color: colors.text, fontSize: 15 },
  cancel: { alignItems: 'center', marginTop: 12 },
  cancelText: { fontFamily: fonts.body, color: colors.textMuted, fontSize: 13 },
});
