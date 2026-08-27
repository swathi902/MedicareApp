import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEFEF' },
  scrollContent: { paddingBottom: 40, flexGrow: 1 },
  form: { marginTop: 95, paddingHorizontal: 22, flex: 1 },
  primaryBtn: { backgroundColor: '#0066FE', height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 24, shadowColor: '#0066FE', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40, paddingBottom: 16 },
  footerText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  footerLink: { fontSize: 14, fontWeight: '700', color: '#0066FE' },
});
