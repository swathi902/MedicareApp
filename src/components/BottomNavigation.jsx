import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

export default function BottomNavigation({ navigation, activeTab = 'Home' }) {
  const tabs = [
    {
      name: 'Home',
      icon: 'home',
    },
    {
      name: 'Search',
      icon: 'search',
    },
    {
      name: 'Profile',
      icon: 'person',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              style={isActive ? styles.active : styles.inactive}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(tab.name)}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={isActive ? colors.white : colors.placeholder}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 75,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  bottomNav: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    borderRadius: 35,
    paddingHorizontal: 6,
    paddingVertical: 6,
    alignItems: 'center',
    elevation: 10,
  },

  active: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },

  inactive: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
});