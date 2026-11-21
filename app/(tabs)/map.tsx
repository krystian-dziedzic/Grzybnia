import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinds } from '../../hooks/useFinds';
import SpeciesPickerModal from '../../components/SpeciesPickerModal';
import { mushrooms, Mushroom } from '../../data/mushrooms';
import { colors, edibilityColor, fonts } from '../../theme/colors';

export default function MapScreen() {
  const { finds, addFind, removeFind } = useFinds();
  const [region, setRegion] = useState<Region | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pendingCoords, setPendingCoords] = useState<{ latitude: number; longitude: number } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionDenied(true);
        return;
      }
      const position = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const mushroomById = (id: string): Mushroom | undefined => mushrooms.find((m) => m.id === id);

  const handleAddPress = async () => {
    const position = await Location.getCurrentPositionAsync({});
    setPendingCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    setPickerVisible(true);
  };

  const handleSave = (mushroom: Mushroom, note: string, photoUri?: string) => {
    if (!pendingCoords) return;
    addFind({
      mushroomId: mushroom.id,
      latitude: pendingCoords.latitude,
      longitude: pendingCoords.longitude,
      note,
      photoUri,
    });
    setPickerVisible(false);
  };

  if (permissionDenied) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centerMessage}>
          <Ionicons name="location-outline" size={32} color={colors.textMuted} />
          <Text style={styles.messageText}>
            Potrzebujemy dostępu do lokalizacji, żeby zaznaczać Twoje znaleziska na mapie.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!region) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centerMessage}>
          <Text style={styles.messageText}>Ustalanie lokalizacji...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <MapView style={styles.map} initialRegion={region} showsUserLocation>
        {finds.map((find) => {
          const mushroom = mushroomById(find.mushroomId);
          if (!mushroom) return null;
          return (
            <Marker
              key={find.id}
              coordinate={{ latitude: find.latitude, longitude: find.longitude }}
              pinColor={edibilityColor[mushroom.edibility]}
              title={mushroom.name}
              description={find.note || new Date(find.createdAt).toLocaleDateString('pl-PL')}
              onCalloutPress={() =>
                Alert.alert('Usunąć znalezisko?', mushroom.name, [
                  { text: 'Anuluj', style: 'cancel' },
                  { text: 'Usuń', style: 'destructive', onPress: () => removeFind(find.id) },
                ])
              }
            />
          );
        })}
      </MapView>

      <Pressable style={styles.fab} onPress={handleAddPress}>
        <Ionicons name="add" size={28} color={colors.background} />
      </Pressable>

      <SpeciesPickerModal
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  map: { flex: 1 },
  centerMessage: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  messageText: { fontFamily: fonts.body, color: colors.textMuted, textAlign: 'center', fontSize: 14 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
