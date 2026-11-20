import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Grid from '../components/Grid';
import TopicRow from '../components/TopicRow';
import { useTheme, useLayout } from '../theme';
import { searchTopics, TOPICS } from '../data/topics';

export default function SearchScreen({ onOpenTopic }) {
  const t = useTheme();
  const { fs } = useLayout();
  const [q, setQ] = useState('');

  const results = useMemo(() => searchTopics(q), [q]);
  const all = useMemo(() => [...TOPICS].sort((a, b) => a.title.localeCompare(b.title)), []);
  const showing = q.trim() ? results : all;

  return (
    <Screen>
      <View style={[styles.box, { backgroundColor: t.input, borderColor: t.border }]}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search e.g. burns, sugar, fever"
          placeholderTextColor={t.muted}
          style={[styles.input, { color: t.text, fontSize: fs(16) }]}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          accessibilityLabel="Search topics"
        />
        {q ? (
          <Pressable onPress={() => setQ('')} hitSlop={10} accessibilityLabel="Clear search">
            <Text style={[styles.clear, { color: t.muted }]}>✕</Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={[styles.count, { color: t.muted, fontSize: fs(13) }]}>
        {q.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : `All topics (A–Z)`}
      </Text>

      {q.trim() && results.length === 0 ? (
        <Text style={[styles.empty, { color: t.muted, fontSize: fs(15) }]}>
          No topics found. Try a different word.
        </Text>
      ) : (
        <Grid>
          {showing.map((topic) => (
            <TopicRow key={topic.id} topic={topic} onPress={onOpenTopic} showCategory />
          ))}
        </Grid>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, minHeight: 50 },
  icon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, paddingVertical: 10 },
  clear: { fontSize: 18, paddingHorizontal: 4 },
  count: { marginVertical: 12, fontWeight: '600' },
  empty: { textAlign: 'center', marginTop: 40 },
});
