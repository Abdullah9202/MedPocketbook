import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Grid from '../components/Grid';
import { useTheme, useLayout } from '../theme';
import { CATEGORIES } from '../data/categories';
import { getTopicsByCategory, getTopic } from '../data/topics';

const QUICK = ['cpr-adult', 'choking-adult', 'stroke', 'severe-bleeding'];

export default function HomeScreen({ onOpenCategory, onOpenTopic }) {
  const t = useTheme();
  const { fs, columns } = useLayout();

  return (
    <Screen>
      <View style={[styles.hero, { backgroundColor: t.dangerBg, borderColor: t.danger }]}>
        <Text style={[styles.heroTitle, { color: t.danger, fontSize: fs(15) }]}>🚨 In an emergency</Text>
        <Text style={[styles.heroBody, { color: t.text, fontSize: fs(14) }]}>
          Call your local emergency number first (e.g. 911, 112, 999 or 1122). Use this guide while help is on the way.
        </Text>
      </View>

      <Text style={[styles.section, { color: t.muted, fontSize: fs(13) }]}>QUICK ACCESS</Text>
      <View style={styles.quickWrap}>
        {QUICK.map((id) => {
          const topic = getTopic(id);
          return (
            <Pressable
              key={id}
              onPress={() => onOpenTopic(topic)}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.chip,
                { backgroundColor: t.card, borderColor: t.border },
                pressed && { opacity: 0.8 },
              ]}
            >
              <Text style={[styles.chipText, { color: t.text, fontSize: fs(14) }]}>{topic.title}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.section, { color: t.muted, fontSize: fs(13) }]}>BROWSE</Text>
      <Grid columns={Math.max(2, columns)}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => onOpenCategory(c)}
            accessibilityRole="button"
            accessibilityLabel={`${c.title}. ${c.subtitle}`}
            android_ripple={{ color: t.border }}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: t.card, borderColor: t.border },
              pressed && { opacity: 0.85 },
            ]}
          >
            <View style={[styles.iconCircle, { backgroundColor: c.color + '22' }]}>
              <Text style={styles.icon}>{c.icon}</Text>
            </View>
            <Text style={[styles.cardTitle, { color: t.text, fontSize: fs(15.5) }]}>{c.title}</Text>
            <Text style={[styles.cardSub, { color: t.muted, fontSize: fs(12.5) }]} numberOfLines={2}>
              {c.subtitle}
            </Text>
            <Text style={[styles.count, { color: c.color, fontSize: fs(12) }]}>
              {getTopicsByCategory(c.id).length} topics
            </Text>
          </Pressable>
        ))}
      </Grid>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 18 },
  heroTitle: { fontWeight: '800', marginBottom: 4 },
  heroBody: { lineHeight: 20 },
  section: { fontWeight: '700', letterSpacing: 0.8, marginBottom: 10 },
  quickWrap: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 18, marginHorizontal: -4 },
  chip: { borderWidth: 1, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, margin: 4 },
  chipText: { fontWeight: '600' },
  card: { borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, padding: 14, marginBottom: 10, minHeight: 150 },
  iconCircle: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  icon: { fontSize: 24 },
  cardTitle: { fontWeight: '700', marginBottom: 4 },
  cardSub: { lineHeight: 17, marginBottom: 8 },
  count: { fontWeight: '700', marginTop: 'auto' },
});
