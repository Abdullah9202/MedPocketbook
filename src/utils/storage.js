import AsyncStorage from '@react-native-async-storage/async-storage';

// All data stays on the device. Nothing is sent anywhere.
const BOOKMARKS_KEY = 'medpocket.bookmarks.v1';
const DISCLAIMER_KEY = 'medpocket.disclaimerAccepted.v1';

export async function loadBookmarks() {
  try {
    const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveBookmarks(ids) {
  try {
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch {
    // Non-critical: ignore write errors.
  }
}

export async function hasAcceptedDisclaimer() {
  try {
    return (await AsyncStorage.getItem(DISCLAIMER_KEY)) === 'yes';
  } catch {
    return false;
  }
}

export async function acceptDisclaimer() {
  try {
    await AsyncStorage.setItem(DISCLAIMER_KEY, 'yes');
  } catch {
    // ignore
  }
}
