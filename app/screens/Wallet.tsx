import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import '@walletconnect/react-native-compat';
import { Web3Modal, useWalletConnectModal } from '@walletconnect/modal-react-native';

interface RouteProps {
  navigation: NavigationProp<any, any>;
}

const Wallet = ({ navigation }: RouteProps) => {
  const { open, isConnected, provider, address } = useWalletConnectModal();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      await open(); // opens the WalletConnect modal
      if (provider && address) {
        setWalletAddress(address);
        Alert.alert('Wallet Connected', `Address: ${address}`);
      }
    } catch (error) {
      console.error('Wallet connection failed', error);
      Alert.alert('Error', 'Failed to connect wallet');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
      {walletAddress ? (
        <Text style={styles.address}>Connected: {walletAddress}</Text>
      ) : (
        <Text style={styles.address}>No wallet connected</Text>
      )}
      <Button title="Connect Wallet" onPress={handleConnectWallet} />
      <Button title="Open Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Log Out" onPress={() => FIREBASE_AUTH.signOut()} />
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  address: { fontSize: 14, marginBottom: 20, textAlign: 'center' },
});
