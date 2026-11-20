import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useTheme, useLayout } from '../theme';
import { getCategory } from '../data/categories';

export default function TopicRow({ topic, onPress, showCategory = false }) {
  const t = useTheme();
  const { fs } = useLayout();
  const cat = getCategory(topic.categoryId);

  return (
    <Pressable
      onPress={() => onPress(topic)}
      accessibilityRole="button"
      accessibilityLabel={topic.title}
      android_ripple={{ color: t.border }}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: t.card, borderColor: t.border },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={[styles.bar, { backgroundColor: cat?.color || t.primary }]} />
      <View style={styles.body}>
        {showCategory && cat ? (
          <Text style={[styles.cat, { color: cat.color, fontSize: fs(12) }]}>{cat.title.toUpperCase()}</Text>
        ) : null}
        <Text style={[styles.title, { color: t.text, fontSize: fs(16) }]}>{topic.title}</Text>
        <Text style={[styles.summary, { color: t.muted, fontSize: fs(13.5) }]} numberOfLines={2}>
          {topic.summary}
        </Text>
      </View>
      <Text style={[styles.chev, { color: t.muted }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    overflow: 'hidden',
    minHeight: 64,
  },
  bar: { width: 5, alignSelf: 'stretch' },
  body: { flex: 1, paddingVertical: 12, paddingHorizontal: 14 },
  cat: { fontWeight: '700', letterSpacing: 0.6, marginBottom: 2 },
  title: { fontWeight: '700', marginBottom: 3 },
  summary: { lineHeight: 19 },
  chev: { fontSize: 26, paddingRight: 14 },
});
