import { Text, View, Image, StyleSheet, Button, TouchableOpacity, ScrollView, StatusBar, Linking } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { SoundCard } from "@/components/SoundCard";
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function Index() {

  StatusBar.setHidden(true);

  const [sound, setSound] = useState();
  
  async function playSound(track: { sound: Audio.Sound }) {
    const { sound } = track;
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const cardData = [
    { title: 'Splash', soundFileName: 'splash', iconName: 'water' },
    { title: 'Boing', soundFileName: 'boing', iconName: 'baseball' },
    { title: 'Bonk', soundFileName: 'crash1', iconName: 'hammer' },
    { title: 'Caduta 1', soundFileName: 'fall', iconName: 'person-falling' },
    { title: 'Caduta 2', soundFileName: 'fall2', iconName: 'person-falling' },
    { title: 'Freccia', soundFileName: 'palo', iconName: 'bullseye' },
    { title: 'Swish', soundFileName: 'sbing', iconName: 'paw' },
    { title: 'Liscio', soundFileName: 'slashes', iconName: 'hand-back-fist' },
    { title: 'Viscini', soundFileName: 'vicini', iconName: 'dog' },
    { title: 'Besughi', soundFileName: 'besughi', iconName: 'fish' },
  ];



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/papera.png')}
            style={{ width: 130, height: 117 }}
          />
        </View>
        <ScrollView
          style={{
            flex: 1,
            padding: 16,
            backgroundColor: '#F6C527',
          }}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <View style={styles.cardContainer}>
            { cardData.map((card, index) => (
              <SoundCard key={index} cardData={card} onTrackSet={playSound} />
            ))}
            </View>
            <TouchableOpacity onPress={() => Linking.openURL('https://doc-hosting.flycricket.io/papera-soundboard-privacy-policy/43d158f1-020d-4df6-8169-a7d362f48133/privacy')}>
              <Text style={styles.privacyText}>Privacy Policy</Text>
            </TouchableOpacity>
          </ScrollView>
          
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#F6C527',
    paddingBottom: 8,

  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#F6C527',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    marginBottom: 20,
  },
  privacyText: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});


