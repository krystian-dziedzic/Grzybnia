import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { mushrooms } from '../../data/mushrooms';
import EdibilityBadge from '../../components/EdibilityBadge';
import PoisonAlert from '../../components/PoisonAlert';
import MushroomIcon from '../../components/MushroomIcon';
import { colors, edibilityColor, fonts, radius } from '../../theme/colors';

export default function MushroomDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const mushroom = mushrooms.find((m) => m.id === id);

  if (!mushroom) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Nie znaleziono gatunku.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Ionicons name="arrow-back" size={22} color={colors.sage} />
          <Text style={styles.backText}>Atlas</Text>
        </Pressable>

        <View style={styles.heroCard}>
          <View style={styles.iconGlow}>
            <MushroomIcon size={52} color={edibilityColor[mushroom.edibility]} />
          </View>
          <Text style={styles.name}>{mushroom.name}</Text>
          <Text style={styles.latinName}>{mushroom.latinName}</Text>
          <EdibilityBadge edibility={mushroom.edibility} />
        </View>

        {mushroom.edibility === 'poisonous' && <PoisonAlert />}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opis</Text>
          <Text style={styles.sectionText}>{mushroom.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sezon</Text>
          <Text style={styles.sectionText}>{mushroom.season}</Text>
        </View>

        {mushroom.warning && (
          <View style={[styles.section, styles.warningBox]}>
            <Ionicons name="alert-circle-outline" size={18} color={colors.inedible} />
            <Text style={[styles.sectionText, styles.warningText]}>{mushroom.warning}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  backText: { fontSize: 15, fontFamily: fonts.bodyMedium, color: colors.sage },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 24,
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  iconGlow: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: { fontSize: 26, fontFamily: fonts.heading, color: colors.text, textAlign: 'center' },
  latinName: {
    fontSize: 14,
    fontFamily: fonts.body,
    fontStyle: 'italic',
    color: colors.textMuted,
    marginBottom: 6,
  },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 13,
    fontFamily: fonts.bodyBold,
    color: colors.sage,
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  sectionText: { fontSize: 15, fontFamily: fonts.body, color: colors.text, lineHeight: 22 },
  warningBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.md,
    padding: 12,
    alignItems: 'flex-start',
  },
  warningText: { flex: 1, color: colors.accentLight, fontSize: 13, lineHeight: 18 },
  notFound: { textAlign: 'center', marginTop: 60, fontFamily: fonts.body, color: colors.textMuted },
});
