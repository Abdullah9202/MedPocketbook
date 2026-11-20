import React from 'react';
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useTheme, useLayout } from '../theme';

export const DISCLAIMER_TEXT =
  'MedPocket provides general health and first-aid information for educational purposes only. ' +
  'It is not medical advice and is not a substitute for diagnosis or treatment by a qualified healthcare professional. ' +
  'It is not a medical device and does not diagnose, treat or monitor any condition. ' +
  'In an emergency, call your local emergency number immediately.';

export default function DisclaimerModal({ visible, onAccept }) {
  const t = useTheme();
  const { fs } = useLayout();

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={() => {}}>
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: t.card }]}>
          <ScrollView contentContainerStyle={{ padding: 22 }}>
            <Text style={styles.emoji}>⚕️</Text>
            <Text accessibilityRole="header" style={[styles.title, { color: t.text, fontSize: fs(20) }]}>
              Before you start
            </Text>
            <Text style={[styles.body, { color: t.text, fontSize: fs(15) }]}>{DISCLAIMER_TEXT}</Text>
            <Text style={[styles.body, { color: t.muted, fontSize: fs(13.5) }]}>
              MedPocket works fully offline, needs no account and collects no personal data.
            </Text>
            <Pressable
              onPress={onAccept}
              accessibilityRole="button"
              style={({ pressed }) => [styles.btn, { backgroundColor: t.primary }, pressed && { opacity: 0.85 }]}
            >
              <Text style={[styles.btnText, { color: t.primaryText }]}>I understand</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 480, maxHeight: '90%', borderRadius: 18, overflow: 'hidden' },
  emoji: { fontSize: 40, textAlign: 'center', marginBottom: 8 },
  title: { fontWeight: '800', textAlign: 'center', marginBottom: 12 },
  body: { lineHeight: 22, marginBottom: 12 },
  btn: { marginTop: 8, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  btnText: { fontSize: 16, fontWeight: '700' },
});
