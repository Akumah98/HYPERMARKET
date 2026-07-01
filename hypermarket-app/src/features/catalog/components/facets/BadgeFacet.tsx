import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface BadgeFacetProps {
  selectedBadges: string[];
  onToggleBadge: (badge: string) => void;
  styles: any;
}

const BADGES = ['100% Natural', 'Farm Fresh', 'Gluten Free', 'Best Seller', 'Handmade', 'Local Producer'];

export const BadgeFacet = ({
  selectedBadges,
  onToggleBadge,
  styles,
}: BadgeFacetProps) => (
  <View style={styles.section}>
    <Text style={styles.label}>Badges & Features</Text>
    <View style={styles.chipRow}>
      {BADGES.map((badge) => {
        const isSelected = selectedBadges.includes(badge);
        return (
          <TouchableOpacity
            key={badge}
            onPress={() => onToggleBadge(badge)}
            style={[styles.chip, isSelected && styles.chipSelected]}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {badge}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);
