import { Flex, FlexBreakpoints, FlexItem, FlexModifiers } from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import React from "react";
import "./App.css";
import EntitySelector from "./Entity/EntitySelector";
import RegionSelector from "./Region/RegionSelector";
import TagSelector from "./Tag/TagSelector";
import VisibleEvents from './Timeline/VisibleEvents';


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
            <VisibleEvents />
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
            <RegionSelector />
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
