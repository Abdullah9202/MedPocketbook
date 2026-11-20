# MedPocket – Medical Pocketbook (React Native / Expo)

An offline medical reference app for Android: first aid steps, vital signs, lab reference ranges, common conditions, healthy living tips, and simple calculators (BMI, temperature, blood glucose and weight converters).

- **No permissions, no ads, no analytics, no login, no internet needed.** This keeps the Play Console *Data safety* form simple ("No data collected").
- Targets **Android 16 (API 36)**, which Google Play requires for new apps.
- Responsive: 1 column on phones, 2–3 columns on large phones in landscape, tablets and foldables. Content width is capped for readability. Supports dark mode, system font scaling and the Android back button/gesture.
- Built with **Expo SDK 56 / React Native 0.85** (New Architecture, edge-to-edge, 16 KB page-size compatible).

---

## 1. Requirements (one time)

- Node.js 20 LTS or newer: https://nodejs.org
- A free Expo account: https://expo.dev/signup
- EAS CLI: `npm install -g eas-cli`

You do **not** need Android Studio. EAS Build compiles and signs the app in the cloud.

## 2. Install and run

```bash
cd MedPocketbook
npm install
npx expo install --fix      # aligns every package to the exact versions for this Expo SDK
npx expo-doctor             # should report no problems
npx expo start              # scan the QR code with a development build or an Android emulator
```

## 3. ⚠️ Change the package name BEFORE the first upload

Open `app.json` and change:

```json
"package": "com.medpocketbook.reference"
```

to something unique that you own, e.g. `com.yourcompany.medpocket`. **After the first upload to Play, the package name can never be changed.**

## 4. Build the Play Store file (.aab)

```bash
eas login
eas build:configure         # links the project to your Expo account (adds projectId to app.json)
npm run build:aab           # = eas build --platform android --profile production
```

- On the first build, let EAS **generate a new keystore**. EAS stores it safely. Download a backup copy with `eas credentials`.
- When the build finishes, download the `.aab` from the link it gives you.
- If you want an installable APK to test on your phone first: `npm run build:apk`.

## 5. Every update

Increase **both** numbers in `app.json` before each new upload:

```json
"version": "1.0.1",
"android": { "versionCode": 2 }
```

---

## 6. Play Console checklist (to avoid policy issues)

| Play Console section | What to enter |
|---|---|
| **Privacy policy** | Host `privacy-policy.html` (GitHub Pages, Google Sites, etc.) and paste its public URL. Required for all apps. |
| **App access** | All functionality is available without special access. |
| **Ads** | No, my app does not contain ads. |
| **Content rating** | Complete the questionnaire. Category: *Reference, News, or Educational*. Answer "No" to violence, sexuality, gambling, etc. Medical/first-aid info is fine. |
| **Target audience** | **18 and over** (recommended). Do *not* choose ages under 13; that triggers Families policy requirements. |
| **Data safety** | "Does your app collect or share any of the required user data types?" → **No**. Encryption in transit → not applicable (no data sent). Deletion → not applicable. |
| **Health apps declaration** | Select **Medical reference and education**. Do **not** tick "medical device" or anything about diagnosing or treating. |
| **Government apps / Financial features / News** | No / None / No. |
| **App category** | *Medical* (or *Health & Fitness*). |
| **Store listing** | Use the text and graphics in `store-listing/`. Add at least 2 phone screenshots (take them from the APK build). |

### Rules this app already follows
- Clear medical disclaimer shown on first launch and on the About screen, plus a short one at the bottom of every topic.
- Sources listed on every topic. No dosing, diagnosis or treatment claims.
- No dangerous or unused permissions (storage, camera, location, mic, overlay are explicitly blocked).
- No network calls, so the privacy policy and Data safety answers match the real behaviour exactly.

### Production access for new personal accounts
Google requires new **personal** developer accounts to run a **closed test** with at least **12 testers who stay opted in for 14 continuous days** before you can apply for Production. Upload the .aab to *Testing → Closed testing*, add testers by email or a Google Group, share the opt-in link, and apply for production access once the 14 days are done. Check the current numbers in Play Console, since Google can change them.

---

## Project structure

```
App.js                     navigation shell, back button, bookmarks
src/data/categories.js     5 categories
src/data/topics.js         31 topics (edit here to add or change content)
src/screens/               Home, Category, Topic, Search, Saved, Tools, About
src/components/            Header, TabBar, Grid, TopicRow, Screen, DisclaimerModal
src/utils/calculators.js   BMI and unit conversions
src/utils/storage.js       on-device bookmark storage
src/theme.js               light/dark colours + responsive layout helper
assets/                    icon, adaptive icon (+ monochrome), splash
store-listing/             512 icon, 1024x500 feature graphic, listing text
privacy-policy.html        privacy policy to host online
```

### Adding a topic
Add an object to `TOPICS` in `src/data/topics.js` with an `id`, `categoryId`, `title`, `summary`, `keywords`, `sections` and `sources`. Section types: `alert`, `text`, `bullets`, `steps`, `table`.

> Please have the medical content reviewed before publishing. Reference ranges vary by laboratory and population.
