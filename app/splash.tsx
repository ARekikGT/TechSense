import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/auth/welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Solar Panel Icon */}
          <View style={styles.logoIcon}>
            <View style={styles.sun}>
              <View style={styles.sunCore} />
              <View style={[styles.sunRay, styles.sunRay1]} />
              <View style={[styles.sunRay, styles.sunRay2]} />
              <View style={[styles.sunRay, styles.sunRay3]} />
              <View style={[styles.sunRay, styles.sunRay4]} />
              <View style={[styles.sunRay, styles.sunRay5]} />
              <View style={[styles.sunRay, styles.sunRay6]} />
              <View style={[styles.sunRay, styles.sunRay7]} />
              <View style={[styles.sunRay, styles.sunRay8]} />
            </View>
            <View style={styles.panel}>
              <View style={styles.panelGrid}>
                <View style={styles.panelCell} />
                <View style={styles.panelCell} />
                <View style={styles.panelCell} />
                <View style={styles.panelCell} />
                <View style={styles.panelCell} />
                <View style={styles.panelCell} />
              </View>
              <View style={styles.brush} />
            </View>
          </View>
          
          <Text style={styles.logoText}>TechSense</Text>
          <Text style={styles.tagline}>Pure Panels. Maximum Power.</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 120,
    height: 120,
    marginBottom: 32,
    position: 'relative',
  },
  sun: {
    position: 'absolute',
    top: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  sunCore: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f59e0b',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  sunRay: {
    position: 'absolute',
    width: 3,
    height: 12,
    backgroundColor: '#f59e0b',
    borderRadius: 2,
  },
  sunRay1: { top: 0, left: 23.5, transform: [{ rotate: '0deg' }] },
  sunRay2: { top: 4, right: 4, transform: [{ rotate: '45deg' }] },
  sunRay3: { top: 19, right: 0, transform: [{ rotate: '90deg' }] },
  sunRay4: { bottom: 4, right: 4, transform: [{ rotate: '135deg' }] },
  sunRay5: { bottom: 0, left: 23.5, transform: [{ rotate: '180deg' }] },
  sunRay6: { bottom: 4, left: 4, transform: [{ rotate: '225deg' }] },
  sunRay7: { top: 19, left: 0, transform: [{ rotate: '270deg' }] },
  sunRay8: { top: 4, left: 4, transform: [{ rotate: '315deg' }] },
  panel: {
    width: 80,
    height: 60,
    backgroundColor: '#1e40af',
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 4,
  },
  panelGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  panelCell: {
    width: '30%',
    height: '45%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  brush: {
    position: 'absolute',
    top: -8,
    left: 20,
    width: 40,
    height: 6,
    backgroundColor: '#64748b',
    borderRadius: 3,
    transform: [{ rotate: '-15deg' }],
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#94a3b8',
    textAlign: 'center',
    fontWeight: '500',
  },
});