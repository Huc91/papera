import { Text, StyleSheet, TouchableHighlight, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import { soundFiles } from './soundFiles';
import { Audio } from 'expo-av';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

type CardData = {
  title: string;
  soundFileName: string;
  iconName?: string;
};

type Props = {
  cardData: CardData;
  onTrackSet: (track: any) => void;
  isPlaying: boolean;
};

export function SoundCard({ cardData, onTrackSet, isPlaying }: Props) {

  const { title, soundFileName, iconName} = cardData;

  const config = {
    duration: 1000,
    easing: Easing.inOut(Easing.ease),
  };

  const animatedValue = useSharedValue(12);

  const animStyle = useAnimatedStyle(() => {
    const size = animatedValue.value;
    return {
      width: size,
      height: size,
      transform: [
        { translateX: -size / 2 + 12 },
        { translateY: -size / 2 + 12 },
      ],
    };
  });

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(24, config),
      -1,
      true
    );
  }, [animatedValue]);

  async function setTrack() {
    const soundAsset = soundFiles[soundFileName];
    const track = await Audio.Sound.createAsync(soundAsset);
    onTrackSet(track);
  }

  return (
    <TouchableHighlight style={styles.card} onPress={setTrack} underlayColor='#EA913F' activeOpacity={1}>
      <View style={{width: '100%'}}>
        <Icon name={iconName || "music-note"} size={24} color="#28251B" />
        <View style={styles.statusContainer}>
            <View style={[styles.playingIndicator, {backgroundColor: isPlaying ? '#9126FC' : '#CEA41B'}]}>
            </View>
            {isPlaying && <Animated.View style={[styles.aura, animStyle]} >
            </Animated.View>}
          </View>
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
  statusContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
  },
  playingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 12,
    height: 12,
    backgroundColor: '#CEA41B',
    borderRadius: 100,
    transform: [{ translateX: -6 }, { translateY: -6 }],
  },
  aura: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    backgroundColor: 'rgba(255, 0, 217, 0.2)',
    borderRadius: 100,
  }
});
