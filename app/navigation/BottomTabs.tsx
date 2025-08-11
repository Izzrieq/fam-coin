// app/navigation/BottomTabs.tsx
import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../screens/Home';
import Wallet from '../screens/Wallet';
import Profile from '../screens/Profile';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');
const TAB_WIDTH = width * 0.9 / 3; // container width is 90% of screen

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const indicatorPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(indicatorPosition, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.container}>
      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
        {/* Neon green sliding indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{ translateX: indicatorPosition }],
            },
          ]}
        />

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const iconName =
            route.name === 'Home'
              ? 'home'
              : route.name === 'Wallet'
              ? 'wallet'
              : 'person';

          const scale = useRef(new Animated.Value(1)).current;

          useEffect(() => {
            Animated.spring(scale, {
              toValue: isFocused ? 1.2 : 1,
              useNativeDriver: true,
            }).start();
          }, [isFocused]);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (!isFocused) {
                  navigation.navigate(route.name);
                }
              }}
              style={styles.tabButton}
            >
              <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                  name={isFocused ? (iconName as any) : (`${iconName}-outline` as any)}
                  size={28}
                  color={isFocused ? '#00E676' : '#777'}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  blurContainer: {
    flexDirection: 'row',
    width: '90%',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(13,13,13,0.6)',
    paddingVertical: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: TAB_WIDTH, // matches tab width
    backgroundColor: '#00E676',
    borderRadius: 2,
  },
});
