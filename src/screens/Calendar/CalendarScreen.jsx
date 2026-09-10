import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MobileStatusBar from '../../components/MobileStatusBar';
import BottomNavigation from '../../components/BottomNavigation';
import colors from '../../constants/colors';

export default function CalendarScreen({ navigation }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0 - 11
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  // Modal and Form States
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [time, setTime] = useState('');
  const [consultationType, setConsultationType] = useState('Video Consultation');

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Appointments Database State (Key format: "YYYY-MM-DD")
  const [appointmentsData, setAppointmentsData] = useState({
    '2026-09-15': [
      {
        id: '1',
        doctorName: 'Dr. Jessica',
        specialty: 'Neurologist',
        time: '10:00 AM - 10:45 AM',
        type: 'Video Consultation',
        status: 'Confirmed',
        image: require('../../../assets/Doctor4.png'),
      },
      {
        id: '2',
        doctorName: 'Dr. Rico',
        specialty: 'General Practitioner',
        time: '03:30 PM - 04:00 PM',
        type: 'In-Person Checkup',
        status: 'Pending',
        image: require('../../../assets/Doctor2.jpg'),
      },
    ],
    '2026-09-18': [
      {
        id: '3',
        doctorName: 'Dr. Sarah Jenkins',
        specialty: 'Dermatologist',
        time: '11:15 AM - 11:45 AM',
        type: 'Video Consultation',
        status: 'Confirmed',
        image: require('../../../assets/Doctor3.png'),
      },
    ],
  });

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Dynamic calendar matrix generator for any month/year
  const generateMonthMatrix = (year, month) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startingDay = (firstDayIndex === 0 ? 6 : firstDayIndex - 1);
    const totalDays = new Date(year, month + 1, 0).getDate();

    let matrix = [];
    let currentRow = Array(7).fill(null);
    let dayCounter = 1;

    for (let i = startingDay; i < 7; i++) {
      currentRow[i] = dayCounter++;
    }
    matrix.push(currentRow);

    while (dayCounter <= totalDays) {
      currentRow = Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= totalDays; i++) {
        currentRow[i] = dayCounter++;
      }
      matrix.push(currentRow);
    }

    return matrix;
  };

  const monthGrid = generateMonthMatrix(currentYear, currentMonth);

  // Format key for appointments lookup
  const formattedMonth = String(currentMonth + 1).padStart(2, '0');
  const formattedSelectedDay = String(selectedDate).padStart(2, '0');
  const activeDateKey = `${currentYear}-${formattedMonth}-${formattedSelectedDay}`;
  const currentAppointments = appointmentsData[activeDateKey] || [];

  // Handler to Book New Appointment
  const handleBookAppointment = () => {
    if (!doctorName.trim() || !specialty.trim() || !time.trim()) {
      alert('Please fill all fields');
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      doctorName: doctorName.trim(),
      specialty: specialty.trim(),
      time: time.trim(),
      type: consultationType,
      status: 'Confirmed',
      image: require('../../../assets/Doctor4.png'), // Default fallback image for new bookings
    };

    setAppointmentsData((prevData) => {
      const existingList = prevData[activeDateKey] || [];
      return {
        ...prevData,
        [activeDateKey]: [...existingList, newAppointment],
      };
    });

    // Reset Form & Close Modal
    setDoctorName('');
    setSpecialty('');
    setTime('');
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MobileStatusBar />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment Schedule</Text>
        
        {/* Book Appointment Trigger Button */}
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dynamic Month Selector Card */}
        <View style={styles.monthCard}>
          <View style={styles.monthHeaderRow}>
            <TouchableOpacity onPress={handlePrevMonth} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={18} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.monthTitleText}>
              {monthNames[currentMonth]} {currentYear}
            </Text>
            <TouchableOpacity onPress={handleNextMonth} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* Weekday Labels */}
          <View style={styles.weekRow}>
            {daysOfWeek.map((day, index) => (
              <Text key={index} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>

          {/* Real Dynamic Matrix Grid */}
          {monthGrid.map((week, rowIndex) => (
            <View key={rowIndex} style={styles.weekRow}>
              {week.map((date, colIndex) => {
                if (date === null) {
                  return <View key={colIndex} style={styles.dayCellEmpty} />;
                }
                const isSelected = selectedDate === date;
                const dateKey = `${currentYear}-${formattedMonth}-${String(date).padStart(2, '0')}`;
                const hasEvent = appointmentsData[dateKey] !== undefined && appointmentsData[dateKey].length > 0;

                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[styles.dayCell, isSelected && styles.selectedDayCell]}
                    onPress={() => setSelectedDate(date)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.dayCellText, isSelected && styles.selectedDayCellText]}>
                      {date}
                    </Text>
                    {hasEvent && (
                      <View style={[styles.eventDot, isSelected && styles.selectedEventDot]} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Selected Date Agenda Header */}
        <View style={styles.agendaHeaderRow}>
          <Text style={styles.agendaTitle}>
            Schedule for {monthNames[currentMonth].slice(0, 3)} {selectedDate}, {currentYear}
          </Text>
          <Text style={styles.agendaCount}>{currentAppointments.length} Appointments</Text>
        </View>

        {/* Appointments List */}
        {currentAppointments.length > 0 ? (
          currentAppointments.map((item) => (
            <View key={item.id} style={styles.appointmentCard}>
              <View style={styles.appointmentTopRow}>
                <View style={styles.doctorInfoContainer}>
                  <Image source={item.image} style={styles.doctorAvatar} />
                  <View>
                    <Text style={styles.docName}>{item.doctorName}</Text>
                    <Text style={styles.docSpecialty}>{item.specialty}</Text>
                  </View>
                </View>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: item.status === 'Confirmed' ? '#E0F2FE' : '#FEF3C7' }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    { color: item.status === 'Confirmed' ? '#0369A1' : '#B45309' }
                  ]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.appointmentDetailRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                  <Text style={styles.detailText}> {item.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="videocam-outline" size={14} color={colors.primary} />
                  <Text style={[styles.detailText, { color: colors.primary, fontWeight: '600' }]}> {item.type}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-clear-outline" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No checkups scheduled for this day.</Text>
            <TouchableOpacity 
              style={styles.bookNowPromptBtn}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.bookNowPromptText}>+ Book Appointment</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Book Appointment Modal Form */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Book for {monthNames[currentMonth]} {selectedDate}, {currentYear}
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Doctor Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Dr. Sharma"
              placeholderTextColor="#94A3B8"
              value={doctorName}
              onChangeText={setDoctorName}
            />

            <Text style={styles.inputLabel}>Specialty</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Cardiologist"
              placeholderTextColor="#94A3B8"
              value={specialty}
              onChangeText={setSpecialty}
            />

            <Text style={styles.inputLabel}>Time Slot</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 02:00 PM - 02:45 PM"
              placeholderTextColor="#94A3B8"
              value={time}
              onChangeText={setTime}
            />

            <Text style={styles.inputLabel}>Consultation Type</Text>
            <View style={styles.typeSelectorRow}>
              <TouchableOpacity 
                style={[styles.typeChip, consultationType === 'Video Consultation' && styles.activeTypeChip]}
                onPress={() => setConsultationType('Video Consultation')}
              >
                <Text style={[styles.typeChipText, consultationType === 'Video Consultation' && styles.activeTypeChipText]}>
                  Video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.typeChip, consultationType === 'In-Person Checkup' && styles.activeTypeChip]}
                onPress={() => setConsultationType('In-Person Checkup')}
              >
                <Text style={[styles.typeChipText, consultationType === 'In-Person Checkup' && styles.activeTypeChipText]}>
                  In-Person
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleBookAppointment}
              activeOpacity={0.8}
            >
              <Text style={styles.submitButtonText}>Confirm Appointment</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Bottom Nav */}
      <BottomNavigation navigation={navigation} activeScreen="Calendar" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  monthCard: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekDayText: {
    width: 38,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  dayCellEmpty: {
    width: 38,
    height: 38,
  },
  dayCell: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedDayCell: {
    backgroundColor: colors.white,
  },
  dayCellText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  selectedDayCellText: {
    color: colors.primary,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 5,
  },
  selectedEventDot: {
    backgroundColor: colors.primary,
  },
  agendaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  agendaTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  agendaCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  appointmentCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  doctorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  doctorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: '#E2E8F0',
  },
  docName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  docSpecialty: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  appointmentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  bookNowPromptBtn: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
  },
  bookNowPromptText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
    marginTop: 10,
  },
  textInput: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: colors.text,
    backgroundColor: '#F8FAFC',
  },
  typeSelectorRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  typeChip: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F8FAFC',
  },
  activeTypeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTypeChipText: {
    color: colors.white,
  },
  submitButton: {
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});