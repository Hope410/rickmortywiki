import {Tab, TabView} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CharactersView} from './views/characters';
import {EpisodesView} from './views/episodes';
import {LocationsView} from './views/locations';

type TabOptions = {
  title: string;
  iconName: string;
  Component: React.FC;
};

const TABS: TabOptions[] = [
  {
    title: 'Characters',
    iconName: 'person',
    Component: CharactersView,
  },
  {
    title: 'Locations',
    iconName: 'location',
    Component: LocationsView,
  },
  {
    title: 'Episodes',
    iconName: 'film',
    Component: EpisodesView,
  },
];

const styles = StyleSheet.create({
  app: {
    flexDirection: 'column',
  },
  scrollAreaView: {
    flex: 1,
  },
  scrollView: {},
  tabView: {},
  tabViewItem: {
    width: '100%',
  },
  tabsContainer: {},
  tabItem: {},
});

const App = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <TabView
        containerStyle={styles.tabView}
        value={index}
        onChange={setIndex}
        animationType="spring">
        {TABS.map((options, key) => (
          <TabView.Item key={'view_' + key} style={styles.tabViewItem}>
            <options.Component />
          </TabView.Item>
        ))}
      </TabView>
      <Tab
        style={styles.tabsContainer}
        value={index}
        onChange={e => setIndex(e)}
        variant="primary"
        disableIndicator>
        {TABS.map((options, key) => (
          <Tab.Item
            key={'item_' + key}
            title={options.title}
            titleStyle={styles.tabItem}
            icon={{name: options.iconName, type: 'ionicon', color: 'white'}}
          />
        ))}
      </Tab>
    </>
  );
};

export default App;
