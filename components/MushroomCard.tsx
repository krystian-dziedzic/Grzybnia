import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { Mushroom } from '../data/mushrooms';
import MushroomIcon from './MushroomIcon';
import { colors, edibilityColor, fonts, radius } from '../theme/colors';

const EDIBILITY_LABEL: Record<Mushroom['edibility'], string> = {
  edible: 'Jadalny',
  inedible: 'Niejadalny',
  poisonous: 'Trujący',
};

// Stała ale nierówna wysokość zdjęcia na karcie jak w prawdziwym
// masonry gdzie wysokość zależy od zdjęcia a nie jest wszędzie taka sama
const PHOTO_HEIGHTS = [132, 176, 152, 196, 140];
// Nie losowa żeby nie było skoków w layout'cie
// tylko cykliczna.

export default function MushroomCard({ mushroom, index }: { mushroom: Mushroom; index: number }) {
  const photoHeight = PHOTO_HEIGHTS[index % PHOTO_HEIGHTS.length];

  return (
    <Animated.View style={styles.card} entering={FadeInUp.delay((index % 8) * 50).duration(320)}>
      <Link href={`/mushroom/${mushroom.id}`} asChild>
        <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}>
          <View style={[styles.photo, { height: photoHeight }]}>
            <MushroomIcon size={40} color={edibilityColor[mushroom.edibility]} />
          </View>
          <View style={styles.caption}>
            <Text style={styles.name} numberOfLines={2}>
              {mushroom.name}
            </Text>
            <Text style={styles.latinName} numberOfLines={1}>
              {mushroom.latinName}
            </Text>
            <Text style={[styles.edibility, { color: edibilityColor[mushroom.edibility] }]}>
              {EDIBILITY_LABEL[mushroom.edibility]}
            </Text>
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  pressable: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  photo: {
    backgroundColor: colors.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    padding: 12,
    gap: 3,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.headingMedium,
    color: colors.text,
  },
  latinName: {
    fontSize: 11,
    fontFamily: fonts.body,
    fontStyle: 'italic',
    color: colors.textMuted,
  },
  edibility: {
    fontSize: 11,
    fontFamily: fonts.bodyBold,
    marginTop: 2,
  },
});
