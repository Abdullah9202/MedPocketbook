import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, BackHandler, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Header from './src/components/Header';
import TabBar from './src/components/TabBar';
import DisclaimerModal from './src/components/DisclaimerModal';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import TopicScreen from './src/screens/TopicScreen';
import SearchScreen from './src/screens/SearchScreen';
import SavedScreen from './src/screens/SavedScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import AboutScreen from './src/screens/AboutScreen';
import { useTheme } from './src/theme';
import { getCategory } from './src/data/categories';
import { getTopic } from './src/data/topics';
import { loadBookmarks, saveBookmarks, hasAcceptedDisclaimer, acceptDisclaimer } from './src/utils/storage';

const TAB_TITLES = {
  home: 'MedPocket',
  search: 'Search',
  saved: 'Saved Topics',
  tools: 'Medical Tools',
  about: 'About',
};

function Main() {
  const t = useTheme();
  const [tab, setTab] = useState('home');
  // Stack of pushed routes on top of the current tab: { name: 'category' | 'topic', id }
  const [stack, setStack] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    (async () => {
      setBookmarks(await loadBookmarks());
      setShowDisclaimer(!(await hasAcceptedDisclaimer()));
    })();
  }, []);

  const push = useCallback((route) => setStack((s) => [...s, route]), []);
  const pop = useCallback(() => setStack((s) => s.slice(0, -1)), []);

  const openCategory = useCallback((c) => push({ name: 'category', id: c.id }), [push]);
  const openTopic = useCallback((topic) => push({ name: 'topic', id: topic.id }), [push]);

  const changeTab = useCallback((key) => {
    setStack([]);
    setTab(key);
  }, []);

  const toggleBookmark = useCallback((id) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev];
      saveBookmarks(next);
      return next;
    });
  }, []);

  // Android hardware / gesture back button.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 0) {
        pop();
        return true;
      }
      if (tab !== 'home') {
        setTab('home');
        return true;
      }
      return false; // let Android close the app
    });
    return () => sub.remove();
  }, [stack.length, tab, pop]);

  const top = stack[stack.length - 1];

  let title = TAB_TITLES[tab];
  let body;
  let right = null;

  if (top?.name === 'category') {
    title = getCategory(top.id)?.title || '';
    body = <CategoryScreen key={`c-${top.id}`} categoryId={top.id} onOpenTopic={openTopic} />;
  } else if (top?.name === 'topic') {
    const topic = getTopic(top.id);
    const saved = bookmarks.includes(top.id);
    title = topic?.title || '';
    body = <TopicScreen key={`t-${top.id}`} topicId={top.id} />;
    right = (
      <Pressable
        onPress={() => toggleBookmark(top.id)}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel={saved ? 'Remove bookmark' : 'Save topic'}
        style={styles.bookmarkBtn}
      >
        <Text style={[styles.bookmark, { color: t.primaryText }]}>{saved ? '★' : '☆'}</Text>
      </Pressable>
    );
  } else if (tab === 'home') {
    body = <HomeScreen onOpenCategory={openCategory} onOpenTopic={openTopic} />;
  } else if (tab === 'search') {
    body = <SearchScreen onOpenTopic={openTopic} />;
  } else if (tab === 'saved') {
    body = <SavedScreen bookmarks={bookmarks} onOpenTopic={openTopic} />;
  } else if (tab === 'tools') {
    body = <ToolsScreen />;
  } else {
    body = <AboutScreen />;
  }

  return (
    <View style={[styles.root, { backgroundColor: t.background }]}>
      <StatusBar style="light" />
      <Header title={title} onBack={stack.length > 0 ? pop : undefined} right={right} />
      <View style={styles.body}>{body}</View>
      <TabBar active={tab} onChange={changeTab} />
      <DisclaimerModal
        visible={showDisclaimer}
        onAccept={() => {
          acceptDisclaimer();
          setShowDisclaimer(false);
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1 },
  bookmarkBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  bookmark: { fontSize: 26 },
});
