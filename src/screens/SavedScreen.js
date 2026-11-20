import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Grid from '../components/Grid';
import TopicRow from '../components/TopicRow';
import { useTheme, useLayout } from '../theme';
import { getTopic } from '../data/topics';

export default function SavedScreen({ bookmarks, onOpenTopic }) {
  const t = useTheme();
  const { fs } = useLayout();
  const topics = bookmarks.map(getTopic).filter(Boolean);

  if (topics.length === 0) {
    return (
      <Screen>
        <View style={styles.empty}>
          <Text style={styles.emoji}>🔖</Text>
          <Text style={[styles.title, { color: t.text, fontSize: fs(18) }]}>No saved topics yet</Text>
          <Text style={[styles.body, { color: t.muted, fontSize: fs(14.5) }]}>
            Open any topic and tap the bookmark icon at the top to keep it here for quick access.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Grid>
        {topics.map((topic) => (
          <TopicRow key={topic.id} topic={topic} onPress={onOpenTopic} showCategory />
        ))}
      </Grid>
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', marginTop: 60, paddingHorizontal: 20 },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  body: { textAlign: 'center', lineHeight: 21 },
});
