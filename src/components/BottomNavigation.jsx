import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import colors from '../constants/colors';
 
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Individual Animated Tab Component for smooth transitions
function AnimatedTab({ tab, isActive, onPress }) {
  // Shared animation values
  const flexAnim = useSharedValue(isActive ? 1.2 : 0.4);
  const paddingAnim = useSharedValue(isActive ? 12 : 0);
  const opacityAnim = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    const config = {
      duration: 100,  
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    };

    flexAnim.value = withTiming(isActive ? 1.2 : 0.4, config);
    paddingAnim.value = withTiming(isActive ? 12 : 0, config);
    opacityAnim.value = withTiming(isActive ? 1 : 0, config);
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: flexAnim.value,
      paddingHorizontal: paddingAnim.value,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnim.value,
      transform: [{ scale: opacityAnim.value }],
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.touchableWrapper}
    >
      <Animated.View
        style={[
          styles.tab,
          isActive ?  styles.activeTab : styles.inactiveTab,
          animatedStyle,
        ]}
      >
        <Ionicons
          name={isActive ? tab.activeIcon : tab.icon}
          size={20}
          color={isActive ? colors.white : colors.placeholder}
        />
        {isActive && (
          <Animated.View style={[styles.textContainer, textStyle]}>
            <Text style={styles.tabText} numberOfLines={1}>
              {tab.name}
            </Text>
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function BottomNavigation({ navigation, activeTab = 'Home' }) {
  const tabs = [
    {
      name: 'Home',
      icon: 'home-outline',
      activeIcon: 'home',
    }, 
    {
      name: 'Search',
      icon: 'search-outline',
      activeIcon: 'search',
    },
    {
      name: 'Calendar',
      icon: 'calendar-outline',
      activeIcon: 'calendar',
    },
    {
      name: 'Profile',
      icon: 'person-outline',
      activeIcon: 'person',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;

          return (
            <AnimatedTab
              key={tab.name}
              tab={tab}
              isActive={isActive}
              onPress={() => navigation.navigate(tab.name)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH * 0.9,
  },
  touchableWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    height: 46,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  activeTab: {
    backgroundColor: colors.primary,
    maxWidth: 110,
  },
  inactiveTab: {
    width: 46,
    backgroundColor: 'transparent',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 6,
  },
});