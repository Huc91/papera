import { Text, View, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export default function Index() {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/splash.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


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
        <TouchableOpacity style={styles.card} onPress={playSound}>
          <Icon name="water-outline" size={24} color="#28251B" />
          <Text>Splash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Icon name="dog-side" size={24} color="#28251B" />
          <Text>Amisci</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text>Card 3</Text>
        </TouchableOpacity>
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
  card: {
    margin: 8,
    padding: 16,
    width: '42%',
    height: 150,
    backgroundColor: '#E1B217',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
