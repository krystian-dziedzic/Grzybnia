import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius } from '../theme/colors';

export default function PoisonAlert() {
  return (
    <View style={styles.container}>
      <Ionicons name="warning-outline" size={22} color={colors.text} />
      <Text style={styles.text}>
        Grzyb trujący — nie spożywaj! W razie podejrzenia zatrucia natychmiast skontaktuj się z
        lekarzem lub zadzwoń pod 112.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.poison,
    borderRadius: radius.md,
    padding: 12,
    gap: 10,
    marginBottom: 16,
  },
  text: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    lineHeight: 18,
  },
});
