import { Text, View, Image, StyleSheet, Button, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { SoundCard } from "@/components/SoundCard";
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function Index() {

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
    { title: 'Splash', soundFileName: 'splash', iconName: 'water-outline' },
    { title: 'Amisci', soundFileName: 'splash', iconName: 'dog-side' },
    { title: 'Card 3', soundFileName: 'splash', iconName: 'music-note' },
    { title: 'Card 3', soundFileName: 'splash', iconName: 'music-note' },
    { title: 'Splash', soundFileName: 'splash', iconName: 'water-outline' },
    { title: 'Amisci', soundFileName: 'splash', iconName: 'dog-side' },
    { title: 'Card 3', soundFileName: 'splash', iconName: 'music-note' },
    { title: 'Card 3', soundFileName: 'splash', iconName: 'music-note' },
    { title: 'Splash', soundFileName: 'splash', iconName: 'water-outline' },
    { title: 'Amisci', soundFileName: 'splash', iconName: 'dog-side' },
    { title: 'Card 3', soundFileName: 'splash', iconName: 'music-note' },
    { title: 'Card 3', soundFileName: 'splash', iconName: 'music-note' },
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
  },
});


