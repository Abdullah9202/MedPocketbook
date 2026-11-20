import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Grid from '../components/Grid';
import { useTheme, useLayout } from '../theme';
import {
  toNumber, bmiMetric, bmiImperial, bmiCategory,
  cToF, fToC, mgdlToMmol, mmolToMgdl, kgToLb, lbToKg, fmt,
} from '../utils/calculators';

function Card({ title, subtitle, children }) {
  const t = useTheme();
  const { fs } = useLayout();
  return (
    <View style={[styles.card, { backgroundColor: t.card, borderColor: t.border }]}>
      <Text accessibilityRole="header" style={[styles.cardTitle, { color: t.text, fontSize: fs(17) }]}>{title}</Text>
      {subtitle ? <Text style={[styles.cardSub, { color: t.muted, fontSize: fs(13) }]}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

function Field({ label, value, onChangeText, unit }) {
  const t = useTheme();
  const { fs } = useLayout();
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: t.muted, fontSize: fs(13) }]}>{label}</Text>
      <View style={[styles.inputRow, { borderColor: t.border, backgroundColor: t.input }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={t.muted}
          accessibilityLabel={label}
          style={[styles.input, { color: t.text, fontSize: fs(16) }]}
          maxLength={7}
        />
        {unit ? <Text style={[styles.unit, { color: t.muted, fontSize: fs(14) }]}>{unit}</Text> : null}
      </View>
    </View>
  );
}

function Segmented({ options, value, onChange }) {
  const t = useTheme();
  return (
    <View style={[styles.seg, { borderColor: t.primary }]}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[styles.segItem, active && { backgroundColor: t.primary }]}
          >
            <Text style={{ color: active ? t.primaryText : t.primary, fontWeight: '700' }}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Result({ big, small, tone }) {
  const t = useTheme();
  const { fs } = useLayout();
  const color = tone === 'ok' ? '#2E9D5B' : tone === 'warn' ? '#D98A00' : tone === 'bad' ? t.danger : t.primary;
  return (
    <View style={[styles.result, { backgroundColor: t.tableHead }]}>
      <Text style={[styles.big, { color, fontSize: fs(26) }]}>{big}</Text>
      {small ? <Text style={[styles.small, { color: t.text, fontSize: fs(14) }]}>{small}</Text> : null}
    </View>
  );
}

function BmiCalculator() {
  const t = useTheme();
  const [unit, setUnit] = useState('metric');
  const [kg, setKg] = useState('');
  const [cm, setCm] = useState('');
  const [lb, setLb] = useState('');
  const [ft, setFt] = useState('');
  const [inch, setInch] = useState('');

  const bmi = unit === 'metric'
    ? bmiMetric(toNumber(kg), toNumber(cm))
    : bmiImperial(toNumber(lb), toNumber(ft) || 0, toNumber(inch) || 0);
  const cat = bmiCategory(bmi);

  return (
    <Card title="BMI Calculator" subtitle="Body Mass Index for adults (18+).">
      <Segmented
        value={unit}
        onChange={setUnit}
        options={[{ label: 'Metric', value: 'metric' }, { label: 'Imperial', value: 'imperial' }]}
      />
      {unit === 'metric' ? (
        <View style={styles.row}>
          <Field label="Weight" unit="kg" value={kg} onChangeText={setKg} />
          <Field label="Height" unit="cm" value={cm} onChangeText={setCm} />
        </View>
      ) : (
        <>
          <Field label="Weight" unit="lb" value={lb} onChangeText={setLb} />
          <View style={styles.row}>
            <Field label="Height" unit="ft" value={ft} onChangeText={setFt} />
            <Field label="" unit="in" value={inch} onChangeText={setInch} />
          </View>
        </>
      )}
      <Result big={Number.isFinite(bmi) ? fmt(bmi) : '—'} small={cat ? cat.label : 'Enter your weight and height'} tone={cat?.tone} />
      <Text style={[styles.hint, { color: t.muted }]}>
        WHO adult ranges: under 18.5 underweight · 18.5–24.9 healthy · 25–29.9 overweight · 30+ obesity.
        BMI does not account for muscle mass and is not valid for children or during pregnancy.
      </Text>
    </Card>
  );
}

function TemperatureConverter() {
  const t = useTheme();
  const [c, setC] = useState('');
  const [f, setF] = useState('');
  return (
    <Card title="Temperature" subtitle="Convert between °C and °F.">
      <View style={styles.row}>
        <Field
          label="Celsius" unit="°C" value={c}
          onChangeText={(v) => { setC(v); const n = toNumber(v); setF(Number.isFinite(n) ? fmt(cToF(n)) : ''); }}
        />
        <Field
          label="Fahrenheit" unit="°F" value={f}
          onChangeText={(v) => { setF(v); const n = toNumber(v); setC(Number.isFinite(n) ? fmt(fToC(n)) : ''); }}
        />
      </View>
      <Text style={[styles.hint, { color: t.muted }]}>Fever is generally 38.0 °C (100.4 °F) or higher.</Text>
    </Card>
  );
}

function GlucoseConverter() {
  const t = useTheme();
  const [mg, setMg] = useState('');
  const [mmol, setMmol] = useState('');
  return (
    <Card title="Blood Glucose" subtitle="Convert between mg/dL and mmol/L.">
      <View style={styles.row}>
        <Field
          label="mg/dL" unit="mg/dL" value={mg}
          onChangeText={(v) => { setMg(v); const n = toNumber(v); setMmol(Number.isFinite(n) ? fmt(mgdlToMmol(n)) : ''); }}
        />
        <Field
          label="mmol/L" unit="mmol/L" value={mmol}
          onChangeText={(v) => { setMmol(v); const n = toNumber(v); setMg(Number.isFinite(n) ? fmt(mmolToMgdl(n), 0) : ''); }}
        />
      </View>
      <Text style={[styles.hint, { color: t.muted }]}>1 mmol/L ≈ 18 mg/dL.</Text>
    </Card>
  );
}

function WeightConverter() {
  const [kg, setKg] = useState('');
  const [lb, setLb] = useState('');
  return (
    <Card title="Weight" subtitle="Convert between kilograms and pounds.">
      <View style={styles.row}>
        <Field
          label="Kilograms" unit="kg" value={kg}
          onChangeText={(v) => { setKg(v); const n = toNumber(v); setLb(Number.isFinite(n) ? fmt(kgToLb(n)) : ''); }}
        />
        <Field
          label="Pounds" unit="lb" value={lb}
          onChangeText={(v) => { setLb(v); const n = toNumber(v); setKg(Number.isFinite(n) ? fmt(lbToKg(n)) : ''); }}
        />
      </View>
    </Card>
  );
}

export default function ToolsScreen() {
  const t = useTheme();
  const { columns, fs } = useLayout();
  return (
    <Screen>
      <Grid columns={Math.min(columns, 2)} gap={14}>
        <BmiCalculator />
        <TemperatureConverter />
        <GlucoseConverter />
        <WeightConverter />
      </Grid>
      <Text style={[styles.footer, { color: t.muted, fontSize: fs(12) }]}>
        Calculators are for general information only and are not a diagnostic tool.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, padding: 16, marginBottom: 14 },
  cardTitle: { fontWeight: '800' },
  cardSub: { marginTop: 2, marginBottom: 12 },
  row: { flexDirection: 'row', marginHorizontal: -6 },
  field: { flex: 1, marginHorizontal: 6, marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: '600', minHeight: 17 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, minHeight: 48 },
  input: { flex: 1, paddingVertical: 8 },
  unit: { marginLeft: 6 },
  seg: { flexDirection: 'row', borderWidth: 1.5, borderRadius: 10, overflow: 'hidden', marginBottom: 14 },
  segItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  result: { borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 4 },
  big: { fontWeight: '800' },
  small: { marginTop: 2, fontWeight: '600' },
  hint: { fontSize: 12.5, lineHeight: 18, marginTop: 10 },
  footer: { textAlign: 'center', marginVertical: 8, fontStyle: 'italic' },
});
