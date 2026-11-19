import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { mushrooms, Edibility, Mushroom } from '../../data/mushrooms';
import MushroomCard from '../../components/MushroomCard';
import { colors, fonts, radius } from '../../theme/colors';

type Filter = 'all' | Edibility;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Wszystkie' },
  { key: 'edible', label: 'Jadalne' },
  { key: 'inedible', label: 'Niejadalne' },
  { key: 'poisonous', label: 'Trujące' },
];

export default function AtlasScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const results = useMemo(() => {
    return mushrooms.filter((m) => {
      const matchesFilter = filter === 'all' || m.edibility === filter;
      const matchesQuery = m.name.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  const { left, right } = useMemo(() => {
    const left: Mushroom[] = [];
    const right: Mushroom[] = [];
    results.forEach((m, i) => (i % 2 === 0 ? left : right).push(m));
    return { left, right };
  }, [results]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Atlas grzybów</Text>
        <Text style={styles.subtitle}>{mushrooms.length} gatunków w bazie</Text>
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Szukaj gatunku..."
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.chips}>
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <Pressable
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {results.length === 0 ? (
        <Text style={styles.empty}>Brak wyników dla podanych kryteriów.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.masonry}>
          <View style={styles.column}>
            {left.map((m, i) => (
              <MushroomCard key={m.id} mushroom={m} index={i * 2} />
            ))}
          </View>
          <View style={styles.column}>
            {right.map((m, i) => (
              <MushroomCard key={m.id} mushroom={m} index={i * 2 + 1} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
  title: { fontSize: 32, fontFamily: fonts.heading, color: colors.text },
  subtitle: { fontSize: 13, fontFamily: fonts.body, color: colors.textMuted, marginTop: 2 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 14, fontFamily: fonts.body, color: colors.text },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.forestMuted },
  chipText: { fontSize: 12, fontFamily: fonts.bodyMedium, color: colors.textMuted },
  chipTextActive: { color: colors.text },
  masonry: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  column: {
    flex: 1,
  },
  empty: { textAlign: 'center', fontFamily: fonts.body, color: colors.textMuted, marginTop: 40 },
});
