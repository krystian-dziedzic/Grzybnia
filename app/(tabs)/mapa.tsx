import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme/colors';

// Tymczasowy ekran — mapę ze znaleziskami dołożymy w kolejnym etapie
// (react-native-maps + expo-location + zapis offline).
export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Ionicons name="map-outline" size={48} color={colors.textMuted} />
        <Text style={styles.title}>Mapa znalezisk</Text>
        <Text style={styles.subtitle}>
          Tu pojawi się mapa z Twoimi zapisanymi stanowiskami grzybów — już wkrótce!
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
