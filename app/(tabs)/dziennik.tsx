import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme/colors';

// Tymczasowy ekran
export default function JournalScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Ionicons name="book-outline" size={48} color={colors.textMuted} />
        <Text style={styles.title}>Dziennik znalezisk</Text>
        <Text style={styles.subtitle}>
          Tu będziesz zapisywać swoje znaleziska ze zdjęciami i notatkami — już wkrótce!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 8 },
  title: { fontSize: 20, fontFamily: fonts.heading, color: colors.text, marginTop: 8 },
  subtitle: { fontSize: 14, fontFamily: fonts.body, color: colors.textMuted, textAlign: 'center' },
});
