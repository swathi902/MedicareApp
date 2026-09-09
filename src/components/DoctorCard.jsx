import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import Rating from './Rating';

export default function DoctorCard({
  doctor,
  onPress,
  showFavorite = false,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Image
        source={doctor.image}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.name}>
          {doctor.name}
        </Text>

        <Text style={styles.specialty}>
          {doctor.specialty || doctor.experience}
        </Text>

        {doctor.specialty && doctor.experience && (
          <Text style={styles.experience}>
            {doctor.experience}
          </Text>
        )}

        <Rating
          rating={doctor.rating}
          reviews={doctor.reviews}
        />
      </View>

      {showFavorite && (
        <TouchableOpacity
          style={styles.favorite}
          activeOpacity={0.8}
        >
          <Ionicons
            name="heart-outline"
            size={18}
            color={colors.primary}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },

  info: {
    marginLeft: 12,
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 3,
  },

  specialty: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  experience: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 5,
  },

  favorite: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});