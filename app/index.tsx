import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
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
  ];



  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#F6C527',
      }}
    >
      <Image
        source={require('@/assets/images/papera.png')}
        style={{ width: 130, height: 117 }}
      />

      <View style={styles.cardContainer}>
        { cardData.map((card, index) => (
          <SoundCard key={index} cardData={card} onTrackSet={playSound} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
});


