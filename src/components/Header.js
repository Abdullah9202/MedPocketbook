import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLayout } from '../theme';

export default function Header({ title, onBack, right }) {
  const t = useTheme();
  const { fs } = useLayout();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { backgroundColor: t.primary, paddingTop: insets.top }]}>
      <View style={[styles.bar, { paddingLeft: insets.left + 8, paddingRight: insets.right + 8 }]}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.6 }]}
          >
            <Text style={[styles.back, { color: t.primaryText }]}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}
        <Text
          numberOfLines={1}
          maxFontSizeMultiplier={1.4}
          accessibilityRole="header"
          style={[styles.title, { color: t.primaryText, fontSize: fs(19) }]}
        >
          {title}
        </Text>
        <View style={styles.right}>{right || null}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { elevation: 3 },
  bar: { height: 56, flexDirection: 'row', alignItems: 'center' },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  back: { fontSize: 34, lineHeight: 38, fontWeight: '300' },
  spacer: { width: 8 },
  title: { flex: 1, fontWeight: '700', marginHorizontal: 4 },
  right: { minWidth: 44, alignItems: 'flex-end' },
});
