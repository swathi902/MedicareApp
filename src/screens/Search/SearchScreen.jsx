import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MobileStatusBar from '../../components/MobileStatusBar';
import colors from '../../constants/colors';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Neurologist', 'Cardiologist', 'Dentist', 'Pediatrician'];

  // Dummy doctors database for search filtering
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

  // Filtering logic based on search text and selected category
  const filteredDoctors = allDoctors.filter((doc) => {
    const matchesQuery =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'All' || doc.specialty.toLowerCase() === selectedCategory.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <MobileStatusBar />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Doctors</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={18} color={colors.placeholder} style={styles.searchIcon} />
          <TextInput
            placeholder="Search doctor, specialty..."
            placeholderTextColor={colors.placeholder}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories Horizontal Scroll */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((cat, index) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.categoryChip, isSelected && styles.selectedCategoryChip]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Search Results Section */}
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery || selectedCategory !== 'All' ? `Results (${filteredDoctors.length})` : 'Recent Searches'}
          </Text>

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <View key={doc.id} style={styles.availableDoctorCard}>
                <Image
                  source={doc.image}
                  style={styles.availableDocImage}
                  resizeMode="cover"
                />
                <View style={styles.availableDocInfo}>
                  <Text style={styles.availableDocName}>{doc.name}</Text>
                  <Text style={styles.availableDocSub}>{doc.specialty} • {doc.experience}</Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={13} color={colors.warning} />
                    <Text style={styles.availableRatingText}> {doc.rating} <Text style={styles.availableReviewsText}>({doc.reviews})</Text></Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noResultContainer}>
              <Ionicons name="search-outline" size={40} color={colors.placeholder} />
              <Text style={styles.noResultText}>No doctors found</Text>
            </View>
          )}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Floating Bottom Navigation Bar */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navIconInactive} activeOpacity={0.8} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={20} color={colors.placeholder} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconActive} activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={20} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navIconInactive} activeOpacity={0.8} onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person" size={20} color={colors.placeholder} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 15, marginBottom: 10 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  scrollContent: { paddingHorizontal: 20 },
  searchBarContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, height: 48, borderRadius: 24, paddingHorizontal: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 15 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: colors.text },
  categoriesScroll: { marginBottom: 20 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, marginRight: 8, height: 36, alignItems: 'center', justifyContent: 'center' },
  selectedCategoryChip: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryText: { fontSize: 13, fontWeight: '600', color: colors.textSecondary },
  selectedCategoryText: { color: colors.white },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 12 },
  resultSection: { marginTop: 5 },
  availableDoctorCard: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: 18, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border, marginBottom: 12, shadowColor: colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  availableDocImage: { width: 60, height: 60, borderRadius: 14 },
  availableDocInfo: { marginLeft: 12, flex: 1 },
  availableDocName: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 2 },
  availableDocSub: { fontSize: 12, color: colors.textSecondary, marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  availableRatingText: { fontSize: 13, fontWeight: '700', color: colors.text },
  availableReviewsText: { color: colors.textSecondary, fontWeight: '400', fontSize: 12 },
  noResultContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  noResultText: { fontSize: 14, color: colors.textSecondary, marginTop: 10 },
  bottomNavContainer: { position: 'absolute', bottom: 75, left: 0, right: 0, alignItems: 'center' },
  bottomNav: { backgroundColor: '#1E293B', flexDirection: 'row', borderRadius: 35, paddingHorizontal: 6, paddingVertical: 6, alignItems: 'center', elevation: 10 },
  navIconActive: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
  navIconInactive: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
});