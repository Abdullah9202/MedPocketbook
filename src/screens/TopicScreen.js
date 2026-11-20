import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { useTheme, useLayout } from '../theme';
import { getTopic } from '../data/topics';
import { getCategory } from '../data/categories';

function Heading({ children }) {
  const t = useTheme();
  const { fs } = useLayout();
  if (!children) return null;
  return (
    <Text accessibilityRole="header" style={[styles.h, { color: t.text, fontSize: fs(17) }]}>
      {children}
    </Text>
  );
}

function Section({ s }) {
  const t = useTheme();
  const { fs } = useLayout();
  const body = { color: t.text, fontSize: fs(15), lineHeight: fs(23) };

  switch (s.type) {
    case 'alert':
      return (
        <View style={[styles.alert, { backgroundColor: t.dangerBg, borderLeftColor: t.danger }]}>
          <Text style={[body, { fontWeight: '600' }]}>⚠️  {s.body}</Text>
        </View>
      );
    case 'text':
      return (
        <View style={styles.block}>
          <Heading>{s.heading}</Heading>
          <Text style={body}>{s.body}</Text>
        </View>
      );
    case 'bullets':
      return (
        <View style={styles.block}>
          <Heading>{s.heading}</Heading>
          {s.items.map((it, i) => (
            <View key={i} style={styles.li}>
              <Text style={[body, styles.bullet, { color: t.primary }]}>•</Text>
              <Text style={[body, styles.liText]}>{it}</Text>
            </View>
          ))}
        </View>
      );
    case 'steps':
      return (
        <View style={styles.block}>
          <Heading>{s.heading}</Heading>
          {s.items.map((it, i) => (
            <View key={i} style={styles.li}>
              <View style={[styles.num, { backgroundColor: t.primary }]}>
                <Text style={[styles.numText, { color: t.primaryText }]} maxFontSizeMultiplier={1.3}>
                  {i + 1}
                </Text>
              </View>
              <Text style={[body, styles.liText]}>{it}</Text>
            </View>
          ))}
        </View>
      );
    case 'table':
      return (
        <View style={styles.block}>
          <Heading>{s.heading}</Heading>
          <View style={[styles.table, { borderColor: t.border, backgroundColor: t.card }]}>
            <View style={[styles.tr, { backgroundColor: t.tableHead }]}>
              {s.columns.map((c, i) => (
                <Text key={i} style={[styles.td, styles.th, { color: t.text, fontSize: fs(13.5) }]}>
                  {c}
                </Text>
              ))}
            </View>
            {s.rows.map((r, ri) => (
              <View
                key={ri}
                style={[styles.tr, { borderTopColor: t.border, borderTopWidth: StyleSheet.hairlineWidth }]}
              >
                {r.map((cell, ci) => (
                  <Text
                    key={ci}
                    style={[
                      styles.td,
                      { color: t.text, fontSize: fs(14), fontWeight: ci === 0 ? '600' : '400' },
                    ]}
                  >
                    {cell}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          {s.note ? <Text style={[styles.note, { color: t.muted, fontSize: fs(13) }]}>{s.note}</Text> : null}
        </View>
      );
    default:
      return null;
  }
}

export default function TopicScreen({ topicId }) {
  const t = useTheme();
  const { fs } = useLayout();
  const topic = getTopic(topicId);
  if (!topic) return null;
  const cat = getCategory(topic.categoryId);

  return (
    <Screen>
      <Text style={[styles.cat, { color: cat?.color, fontSize: fs(12.5) }]}>{cat?.title.toUpperCase()}</Text>
      <Text accessibilityRole="header" style={[styles.title, { color: t.text, fontSize: fs(24) }]}>
        {topic.title}
      </Text>
      <Text style={[styles.summary, { color: t.muted, fontSize: fs(15) }]}>{topic.summary}</Text>

      {topic.sections.map((s, i) => (
        <Section key={i} s={s} />
      ))}

      <View style={[styles.sources, { borderTopColor: t.border }]}>
        <Text style={[styles.srcTitle, { color: t.muted, fontSize: fs(12.5) }]}>SOURCES</Text>
        {topic.sources.map((src, i) => (
          <Text key={i} style={[styles.src, { color: t.muted, fontSize: fs(13) }]}>
            • {src}
          </Text>
        ))}
        <Text style={[styles.disc, { color: t.muted, fontSize: fs(12) }]}>
          For general education only. Not a substitute for professional medical advice.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cat: { fontWeight: '800', letterSpacing: 0.8 },
  title: { fontWeight: '800', marginTop: 2, marginBottom: 6 },
  summary: { lineHeight: 22, marginBottom: 16 },
  block: { marginBottom: 18 },
  h: { fontWeight: '700', marginBottom: 8 },
  alert: { borderLeftWidth: 4, borderRadius: 8, padding: 12, marginBottom: 18 },
  li: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  bullet: { width: 18, fontWeight: '800' },
  liText: { flex: 1 },
  num: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 1 },
  numText: { fontSize: 13, fontWeight: '800' },
  table: { borderWidth: StyleSheet.hairlineWidth, borderRadius: 10, overflow: 'hidden' },
  tr: { flexDirection: 'row' },
  td: { flex: 1, paddingVertical: 10, paddingHorizontal: 10 },
  th: { fontWeight: '800' },
  note: { marginTop: 6, fontStyle: 'italic', lineHeight: 18 },
  sources: { borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 14, marginTop: 6, marginBottom: 12 },
  srcTitle: { fontWeight: '800', letterSpacing: 0.8, marginBottom: 6 },
  src: { lineHeight: 20 },
  disc: { marginTop: 10, fontStyle: 'italic' },
});
