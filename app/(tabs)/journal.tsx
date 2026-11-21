import React from 'react';
import { View, Text, Image, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinds } from '../../hooks/useFinds';
import { mushrooms, Mushroom } from '../../data/mushrooms';
import MushroomIcon from '../../components/MushroomIcon';
import { colors, edibilityColor, fonts, radius } from '../../theme/colors';

export default function JournalScreen() {
  const { finds, removeFind } = useFinds();

  const mushroomById = (id: string): Mushroom | undefined => mushrooms.find((m) => m.id === id);

  const confirmDelete = (id: string, name: string) => {
    Alert.alert('Usunąć znalezisko?', name, [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: () => removeFind(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Dziennik znalezisk</Text>
        <Text style={styles.subtitle}>{finds.length} zapisanych znalezisk</Text>
      </View>

      {finds.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="book-outline" size={40} color={colors.textMuted} />
          <Text style={styles.emptyText}>
            Nie masz jeszcze żadnych znalezisk. Dodaj pierwsze na zakładce Mapa.
          </Text>
        </View>
      ) : (
        <FlatList
          data={finds}
          keyExtractor={(f) => f.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const mushroom = mushroomById(item.mushroomId);
            if (!mushroom) return null;
            return (
              <View style={styles.card}>
                {item.photoUri ? (
                  <Image source={{ uri: item.photoUri }} style={styles.photo} />
                ) : (
                  <View style={[styles.photo, styles.photoPlaceholder]}>
                    <MushroomIcon size={28} color={edibilityColor[mushroom.edibility]} />
                  </View>
                )}
                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.dot, { backgroundColor: edibilityColor[mushroom.edibility] }]} />
                    <Text style={styles.name} numberOfLines={1}>
                      {mushroom.name}
                    </Text>
                    <Pressable onPress={() => confirmDelete(item.id, mushroom.name)}>
                      <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
                    </Pressable>
                  </View>
                  <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString('pl-PL')}</Text>
                  {item.note ? (
                    <Text style={styles.note} numberOfLines={2}>
                      {item.note}
                    </Text>
                  ) : null}
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
  title: { fontSize: 32, fontFamily: fonts.heading, color: colors.text },
  subtitle: { fontSize: 13, fontFamily: fonts.body, color: colors.textMuted, marginTop: 2 },
  list: { padding: 20, gap: 12 },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  photo: { width: 84, height: 84 },
  photoPlaceholder: { backgroundColor: colors.surfaceRaised, alignItems: 'center', justifyContent: 'center' },
  cardBody: { flex: 1, padding: 12, gap: 4, justifyContent: 'center' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  name: { flex: 1, fontSize: 15, fontFamily: fonts.bodyMedium, color: colors.text },
  date: { fontSize: 11, fontFamily: fonts.body, color: colors.textMuted },
  note: { fontSize: 13, fontFamily: fonts.body, color: colors.text, marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  emptyText: { fontFamily: fonts.body, color: colors.textMuted, textAlign: 'center', fontSize: 14 },
});
