import { Text, View, Image, StyleSheet, Button, TouchableOpacity, ScrollView, StatusBar, Linking } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { SoundCard } from "@/components/SoundCard";
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Link } from 'expo-router';

export default function Index() {

  StatusBar.setHidden(true);

  const [sound, setSound] = useState();
  const [playingTrackID, setPlayingTrackID] = useState<number | null>(null);

  async function playSound(track: { sound: Audio.Sound }, id: number) {
    const { sound } = track;
    setSound(sound);

    sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
        setPlayingTrackID(id);
      }
      if (playbackStatus.didJustFinish) {
        // You can add additional logic here, such as updating state or triggering other actions
        setPlayingTrackID(null);
      }
    });

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
    { title: 'Splash', soundFileName: 'splash', iconName: 'water', id: 1 },
    { title: 'Boing', soundFileName: 'boing', iconName: 'baseball', id: 2 },
    { title: 'Bonk', soundFileName: 'crash1', iconName: 'hammer', id: 3 },
    { title: 'Caduta 1', soundFileName: 'fall', iconName: 'person-falling', id: 4 },
    { title: 'Caduta 2', soundFileName: 'fall2', iconName: 'person-falling' },
    { title: 'Freccia', soundFileName: 'palo', iconName: 'bullseye', id: 5 },
    { title: 'Swish', soundFileName: 'sbing', iconName: 'paw', id: 6 },
    { title: 'Liscio', soundFileName: 'slashes', iconName: 'hand-back-fist', id: 7 },
    { title: 'Viscini', soundFileName: 'vicini', iconName: 'dog', id: 8 },
    { title: 'Besughi', soundFileName: 'besughi', iconName: 'fish', id: 9 },
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
              <SoundCard key={card.id + index} cardData={card} onTrackSet={(track) => playSound(track, card.id)} isPlaying={playingTrackID === card.id} />
            ))}
            </View>
            <Link href="/info" style={styles.navButton}>
              <Text>About</Text>
            </Link>
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
    marginBottom: 40,
  },
  navButton: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 40,
  },
});


