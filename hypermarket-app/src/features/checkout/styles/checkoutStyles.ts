import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  scrollContainer: { padding: scale(16), paddingBottom: verticalScale(100), gap: verticalScale(16) },
  section: { backgroundColor: theme.surface, borderWidth: 1, borderColor: theme.border, borderRadius: moderateScale(16), padding: scale(16), gap: verticalScale(12) },
  sectionTitle: { fontSize: moderateScale(16), fontWeight: '700', color: theme.text },
  toggleContainer: { flexDirection: 'row', backgroundColor: theme.inputBg, borderWidth: 1, borderColor: theme.border, borderRadius: moderateScale(12), padding: scale(4) },
  toggleBtn: { flex: 1, height: verticalScale(36), borderRadius: moderateScale(10), justifyContent: 'center', alignItems: 'center' },
  toggleText: { fontSize: moderateScale(13), fontWeight: '600' },
  inputGroup: { gap: verticalScale(6) },
  label: { fontSize: moderateScale(13), fontWeight: '600', color: theme.text },
  input: { height: verticalScale(44), borderWidth: 1, borderColor: theme.border, borderRadius: moderateScale(12), paddingHorizontal: scale(12), color: theme.text, backgroundColor: theme.inputBg, fontSize: moderateScale(14) },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { fontSize: moderateScale(14), color: theme.textMuted },
  priceVal: { fontSize: moderateScale(14), fontWeight: '600', color: theme.text },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: theme.border, paddingTop: verticalScale(10) },
  totalLabel: { fontSize: moderateScale(16), fontWeight: '700', color: theme.text },
  totalVal: { fontSize: moderateScale(18), fontWeight: '800', color: theme.primary },
  errorText: { color: theme.error, fontSize: moderateScale(13), textAlign: 'center' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', height: 50, paddingHorizontal: scale(16), borderBottomWidth: 1, borderBottomColor: theme.border, gap: scale(16) },
  headerTitle: { fontSize: scale(18), fontWeight: '700', color: theme.text },
});
