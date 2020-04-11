import React from "react";
import "./App.css";
import "@patternfly/react-core/dist/styles/base.css";
import {
  Flex,
  FlexItem,
  FlexModifiers,
  FlexBreakpoints,
} from "@patternfly/react-core";

import Timeline from "./Timeline/Timeline";
import CountrySelector from "./Country/CountrySelector";
import TagSelector from "./Tag/TagSelector";
import EntitySelector from "./Entity/EntitySelector";

function App() {
  return (
    <div className="App">
      <Flex
        breakpointMods={[
          { modifier: FlexModifiers["column"] },
          { modifier: FlexModifiers["row"], breakpoint: FlexBreakpoints.lg },
        ]}
        className="chart"
      >
        <Flex
          breakpointMods={[
            { modifier: FlexModifiers["flex-4"] },
            { modifier: FlexModifiers.column },
          ]}
        >
          <FlexItem>
            <h2>Timeline</h2>
            <Timeline />
          </FlexItem>
        </Flex>
        <Flex
          breakpointMods={[
            { modifier: "column" },
            { modifier: FlexModifiers["flex-1"] },
          ]}
          className="form"
        >
          <FlexItem>
            <h2>Selection</h2>
          </FlexItem>
          <FlexItem>
            <CountrySelector />
          </FlexItem>
          <FlexItem>
            <TagSelector />
          </FlexItem>
          <FlexItem>
            <EntitySelector />
          </FlexItem>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
