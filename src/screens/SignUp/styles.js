import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEFEF' },
  scrollContent: { paddingBottom: 40 },
  form: { marginTop: 95, paddingHorizontal: 22 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 20, marginTop: -4 },
  forgotText: { color: '#0066FE', fontSize: 13.5, fontWeight: '700' },
  primaryBtn: { backgroundColor: '#0066FE', height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginBottom: 24, shadowColor: '#0066FE', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 4 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  footerLink: { fontSize: 14, fontWeight: '700', color: '#0066FE' },
});
