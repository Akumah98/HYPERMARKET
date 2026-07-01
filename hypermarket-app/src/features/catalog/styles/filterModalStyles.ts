import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { ThemeType } from '../../../context/ThemeContext';

export const getStyles = (theme: ThemeType) =>
  StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    content: { backgroundColor: theme.background, borderTopLeftRadius: moderateScale(24), borderTopRightRadius: moderateScale(24), padding: scale(20), maxHeight: '85%' },
    title: { fontSize: moderateScale(18), fontWeight: '700', color: theme.text, textAlign: 'center', marginBottom: verticalScale(12) },
    scrollContent: { gap: verticalScale(16), paddingBottom: verticalScale(20) },
    section: { gap: verticalScale(8), marginBottom: verticalScale(10) },
    label: { fontSize: moderateScale(14), fontWeight: '600', color: theme.text },
    inputRow: { flexDirection: 'row', alignItems: 'center', gap: scale(10) },
    input: { flex: 1, height: verticalScale(44), borderWidth: 1, borderColor: theme.border, borderRadius: moderateScale(12), paddingHorizontal: scale(12), color: theme.text, backgroundColor: theme.inputBg, fontSize: moderateScale(14) },
    dividerText: { color: theme.textMuted, fontSize: moderateScale(14) },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: scale(8) },
    chip: { paddingHorizontal: scale(12), paddingVertical: verticalScale(6), borderRadius: moderateScale(18), borderWidth: 1, borderColor: theme.border, backgroundColor: theme.surface },
    chipSelected: { backgroundColor: theme.primary, borderColor: theme.primary },
    chipText: { fontSize: moderateScale(12), color: theme.text },
    chipTextSelected: { color: '#003909', fontWeight: '600' },
    radioRow: { flexDirection: 'row', gap: scale(10) },
    radioButton: { flex: 1, height: verticalScale(38), borderRadius: moderateScale(10), borderWidth: 1, borderColor: theme.border, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.surface },
    radioButtonActive: { backgroundColor: theme.primary, borderColor: theme.primary },
    radioText: { fontSize: moderateScale(12), color: theme.textMuted },
    radioTextActive: { color: '#003909', fontWeight: '600' },
    toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: verticalScale(4) },
    checkbox: { width: scale(22), height: scale(22), borderRadius: moderateScale(6), borderWidth: 1.5, borderColor: theme.border, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.surface },
    checkboxChecked: { backgroundColor: theme.primary, borderColor: theme.primary },
    checkmark: { color: '#003909', fontSize: moderateScale(12), fontWeight: 'bold' },
    buttonRow: { flexDirection: 'row', gap: scale(10), marginTop: verticalScale(14) },
    resetButton: { flex: 1, height: verticalScale(46), borderRadius: moderateScale(14), borderWidth: 1, borderColor: theme.border, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.surface },
    resetText: { color: theme.textMuted, fontWeight: '600', fontSize: moderateScale(14) },
    applyButton: { flex: 2, height: verticalScale(46), borderRadius: moderateScale(14), backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center' },
    applyText: { color: '#003909', fontWeight: '700', fontSize: moderateScale(14) },
  });
