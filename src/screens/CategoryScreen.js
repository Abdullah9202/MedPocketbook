import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Grid from '../components/Grid';
import TopicRow from '../components/TopicRow';
import { useTheme, useLayout } from '../theme';
import { getCategory } from '../data/categories';
import { getTopicsByCategory } from '../data/topics';

export default function CategoryScreen({ categoryId, onOpenTopic }) {
  const t = useTheme();
  const { fs } = useLayout();
  const cat = getCategory(categoryId);
  const topics = getTopicsByCategory(categoryId);

  return (
    <Screen>
      <Text style={[styles.sub, { color: t.muted, fontSize: fs(14) }]}>{cat?.subtitle}</Text>
      <Grid>
        {topics.map((topic) => (
          <TopicRow key={topic.id} topic={topic} onPress={onOpenTopic} />
        ))}
      </Grid>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sub: { marginBottom: 12 },
});
