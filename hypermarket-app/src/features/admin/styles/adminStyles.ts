import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

export const adminStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
    gap: scale(10),
  },
  statCard: {
    width: '48%',
    padding: scale(14),
    borderRadius: scale(12),
    borderWidth: 1,
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(4),
  },
  statValue: {
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    marginVertical: verticalScale(12),
  },
  orderCard: {
    padding: scale(12),
    borderRadius: scale(8),
    marginBottom: verticalScale(10),
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  orderId: {
    fontSize: moderateScale(13),
    fontWeight: '700',
  },
  orderTotal: {
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderRadius: scale(8),
    marginBottom: verticalScale(10),
    borderWidth: 1,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  userMeta: {
    fontSize: moderateScale(11),
    marginTop: verticalScale(2),
  },
  roleBadge: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
    borderWidth: 1,
  },
  roleText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
  },
  filterBar: {
    height: 48,
    marginBottom: verticalScale(12),
  },
  filterContent: {
    gap: scale(8),
    alignItems: 'center',
  },
  filterBtn: {
    paddingHorizontal: scale(14),
    height: 38,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
});
