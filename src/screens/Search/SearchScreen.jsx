import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';     

import MobileStatusBar from '../../components/MobileStatusBar';
import ScreenHeader from '../../components/ScreenHeader';
import SearchBar from '../../components/SearchBar';
import CategoryChip from '../../components/CategoryChip';
import DoctorCard from '../../components/DoctorCard';
import EmptyState from '../../components/EmptyState';
import BottomNavigation from '../../components/BottomNavigation';

import colors from '../../constants/colors';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Neurologist',
    'Cardiologist',
    'Dentist',
    'Pediatrician',
  ];

  const allDoctors = [
    {
      id: '1',
      name: 'Dr. Jessica',
      specialty: 'Neurologist',
      experience: '5 years experienced',
      rating: '4.9',
      reviews: '3,988',
      image: require('../../../assets/Doctor4.png'),
    },
    {
      id: '2',
      name: 'Dr. Rico',
      specialty: 'Cardiologist',
      experience: '3 years experienced',
      rating: '4.8',
      reviews: '2,140',
      image: require('../../../assets/Doctor3.png'),
    },
    {
      id: '3',
      name: 'Dr. Sarah Smith',
      specialty: 'Dentist',
      experience: '7 years experienced',
      rating: '4.7',
      reviews: '1,530',
      image: require('../../../assets/Doctor2.jpg'),
    },
    {
      id: '4',
      name: 'Dr. David Johnson',
      specialty: 'Pediatrician',
      experience: '4 years experienced',
      rating: '4.9',
      reviews: '980',
      image: require('../../../assets/Doctor1.jpg'),
    },
  ];

  const filteredDoctors = allDoctors.filter((doctor) => {
    const query = searchQuery.toLowerCase();

    const matchesQuery =
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === 'All' ||
      doctor.specialty.toLowerCase() ===
        selectedCategory.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  const isSearching =
    searchQuery.length > 0 ||
    selectedCategory !== 'All';

  return (
    <View style={styles.container}>
      <MobileStatusBar />

      <ScreenHeader
        title="Search Doctors"
        navigation={navigation}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search doctor, specialty..."
          showClear
          onClear={() => setSearchQuery('')}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        >
          {categories.map((category) => (
            <CategoryChip
              key={category}
              title={category}
              selected={selectedCategory === category}
              onPress={() =>
                setSelectedCategory(category)
              }
            />
          ))}
        </ScrollView>

        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>
            {isSearching
              ? `Results (${filteredDoctors.length})`
              : 'Recent Searches'}
          </Text>

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onPress={() => {
                  // navigation.navigate('DoctorDetails', {
                  //   doctorId: doctor.id,
                  // });
                }}
              />
            ))
          ) : (
            <EmptyState
              message="No doctors found"
            />
          )}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      <BottomNavigation
        navigation={navigation}
        activeTab="Search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  content: {
    paddingHorizontal: 20,
  },

  categories: {
    marginBottom: 20,
  },

  resultSection: {
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
});