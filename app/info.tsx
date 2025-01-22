import { Text, View, Image, StyleSheet, Button, TouchableOpacity, ScrollView, StatusBar, Linking } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Info() {

  StatusBar.setHidden(true);



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
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Link href="/">Go back</Link>
          <Text style={styles.title}>Papera Soundboard</Text>
          <Text>Welcome to Papera Soundboard! This app allows you to explore a variety of sound clips at your fingertips. Whether you're looking for sound effects, music snippets, or voice recordings, Papera Soundboard has it all. Enjoy a seamless experience with our user-friendly interface and have fun every day.</Text>
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
  title: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
