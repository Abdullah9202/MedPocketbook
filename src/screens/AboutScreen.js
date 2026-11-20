import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Screen from '../components/Screen';
import { useTheme, useLayout } from '../theme';
import { DISCLAIMER_TEXT } from '../components/DisclaimerModal';

function Block({ title, children }) {
  const t = useTheme();
  const { fs } = useLayout();
  return (
    <View style={[styles.block, { backgroundColor: t.card, borderColor: t.border }]}>
      <Text accessibilityRole="header" style={[styles.h, { color: t.text, fontSize: fs(16) }]}>{title}</Text>
      {children}
    </View>
  );
}

export default function AboutScreen() {
  const t = useTheme();
  const { fs } = useLayout();
  const p = { color: t.text, fontSize: fs(14.5), lineHeight: fs(22) };
  const version = Constants.expoConfig?.version || '1.0.0';

  return (
    <Screen>
      <View style={styles.top}>
        <Text style={styles.logo}>⚕️</Text>
        <Text style={[styles.name, { color: t.text, fontSize: fs(22) }]}>MedPocket</Text>
        <Text style={{ color: t.muted, fontSize: fs(13) }}>Medical Pocketbook · Version {version}</Text>
      </View>

      <Block title="Medical disclaimer">
        <Text style={p}>{DISCLAIMER_TEXT}</Text>
      </Block>

      <Block title="Privacy">
        <Text style={p}>
          MedPocket does not collect, store or share any personal data. There are no accounts, ads, analytics or
          trackers, and the app needs no special permissions. Bookmarks are saved only on your device and are removed
          when you uninstall the app.
        </Text>
      </Block>

      <Block title="Content sources">
        <Text style={p}>
          Information is summarised from publicly available guidance by the World Health Organization (WHO),
          American Heart Association, American Red Cross, NHS (UK), US Centers for Disease Control and Prevention
          (CDC), American Diabetes Association and MedlinePlus (US National Library of Medicine). Each topic lists its
          sources. Laboratory reference ranges vary — always follow the range printed on your own report.
        </Text>
      </Block>

      <Block title="Works offline">
        <Text style={p}>All content is stored inside the app, so it is available without an internet connection.</Text>
      </Block>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'center', marginBottom: 16 },
  logo: { fontSize: 44 },
  name: { fontWeight: '800', marginTop: 4 },
  block: { borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, padding: 16, marginBottom: 12 },
  h: { fontWeight: '800', marginBottom: 6 },
});
