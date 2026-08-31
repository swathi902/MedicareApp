import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#DEE5FF' },
  header: { backgroundColor: '#DEE5FF', paddingTop: 68, paddingBottom: 18, paddingHorizontal: 20 },
  title: { fontSize: 27, fontWeight: '800', color: '#000000', textAlign: 'center', lineHeight: 36, letterSpacing: -0.3 },
  imageArea: { flex: 1, marginHorizontal: 16, borderRadius: 24, marginBottom: 160, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
  card: { position: 'absolute', left: 18, right: 18, bottom: 24, backgroundColor: '#ECEEF3', borderRadius: 28, paddingHorizontal: 20, paddingTop: 26, paddingBottom: 22, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 3 },
  description: { fontSize: 14.5, fontWeight: '600', color: '#111827', textAlign: 'center', lineHeight: 22, marginBottom: 22 },
  button: { backgroundColor: '#0066FE', height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', shadowColor: '#0066FE', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});