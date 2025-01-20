import { Text, StyleSheet, TouchableHighlight, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { soundFiles } from './soundFiles';
import { Audio } from 'expo-av';

type CardData = {
  title: string;
  soundFileName: string;
  iconName?: string;
};

type Props = {
  cardData: CardData;
  onTrackSet: (track: any) => void;
};

export function SoundCard({ cardData, onTrackSet }: Props) {
  const { title, soundFileName, iconName } = cardData;

  async function setTrack() {
    const soundAsset = soundFiles[soundFileName];
    const track = await Audio.Sound.createAsync(soundAsset);
    onTrackSet(track);
   
  }

  return (
    <TouchableHighlight style={styles.card} onPress={setTrack} underlayColor='#EA913F' activeOpacity={1}>
      <View>
        <Icon name={iconName || "music-note"} size={24} color="#28251B" />
        <Text>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    padding: 16,
    width: '42%',
    height: 150,
    backgroundColor: '#E1B217',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowHighlight: 0.3,
    // shadowRadius: 3,
    // elevation: 5,
  },
});
