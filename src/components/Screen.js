import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useLayout } from '../theme';

/** Scrollable page body, centred with a max width for tablets / landscape. */
export default function Screen({ children, scroll = true, keyboardShouldPersistTaps = 'handled' }) {
  const t = useTheme();
  const { maxWidth, gutter } = useLayout();
  const insets = useSafeAreaInsets();

  const inner = (
    <View
      style={[
        styles.inner,
        { maxWidth, paddingHorizontal: gutter + Math.max(insets.left, insets.right) },
      ]}
    >
      {children}
    </View>
  );

  if (!scroll) return <View style={[styles.flex, { backgroundColor: t.background }]}>{inner}</View>;

  return (
    <ScrollView
      style={[styles.flex, { backgroundColor: t.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
    >
      {inner}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingVertical: 16 },
  inner: { width: '100%', alignSelf: 'center' },
});
