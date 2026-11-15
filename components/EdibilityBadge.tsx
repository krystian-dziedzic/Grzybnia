import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { edibilityColor, colors, fonts, radius } from '../theme/colors';
import { Edibility } from '../data/mushrooms';

const LABELS: Record<Edibility, string> = {
  edible: 'Jadalny',
  inedible: 'Niejadalny',
  poisonous: 'Trujący',
};

export default function EdibilityBadge({ edibility }: { edibility: Edibility }) {
  return (
    <View style={[styles.badge, { backgroundColor: edibilityColor[edibility] }]}>
      <Text style={styles.text}>{LABELS[edibility]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  text: {
    color: colors.background,
    fontSize: 12,
    fontFamily: fonts.bodyBold,
  },
});
