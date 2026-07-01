import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';

export const vendorStyles = StyleSheet.create({
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
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
    borderWidth: 1,
  },
  productDetails: {
    flex: 1,
    marginLeft: scale(12),
  },
  productName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  productMeta: {
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },
  actions: {
    flexDirection: 'row',
    gap: scale(8),
  },
  actionBtn: {
    padding: scale(6),
    borderRadius: scale(6),
  },
  orderCard: {
    padding: scale(16),
    borderRadius: scale(12),
    marginBottom: verticalScale(12),
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  orderId: {
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  orderDate: {
    fontSize: moderateScale(11),
  },
  orderInfo: {
    fontSize: moderateScale(13),
    marginBottom: verticalScale(4),
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(10),
    paddingTop: verticalScale(10),
    borderTopWidth: 1,
  },
  orderTotal: {
    fontSize: moderateScale(14),
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
