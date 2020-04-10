import React from 'react';
import './App.css';
import '@patternfly/react-core/dist/styles/base.css';
import Timeline from './Timeline/Timeline';
import CountrySelector from './CountrySelector/CountrySelector';
import TagSelector from './TagSelector/TagSelector';

function App() {
  return (
    <div className="App">
      <CountrySelector/>
      <TagSelector/>
      <Timeline />
    </div>
  );
}

export default App;
