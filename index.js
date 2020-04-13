import * as React from 'react';

import {registerRootComponent} from 'expo';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import createStore from './app/redux/@createStore';

import App from './app/TabScreen';

export default function Main() {
  return (
    <StoreProvider store={createStore()}>
      <PaperProvider>
        <App/>
      </PaperProvider>
    </StoreProvider>
  );
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
