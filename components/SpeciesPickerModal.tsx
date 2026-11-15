import React, { useMemo, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { mushrooms, Mushroom } from '../data/mushrooms';
import { colors, edibilityColor, fonts, radius } from '../theme/colors';

export default function SpeciesPickerModal({
  visible,
  onClose,
  onSave,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (mushroom: Mushroom, note: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Mushroom | null>(null);
  const [note, setNote] = useState('');

  const results = useMemo(
    () => mushrooms.filter((m) => m.name.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const reset = () => {
    setQuery('');
    setSelected(null);
    setNote('');
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
                  onSave(selected, note);
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
