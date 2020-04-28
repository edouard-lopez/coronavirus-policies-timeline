import { Flex, FlexBreakpoints, FlexItem, FlexModifiers } from "@patternfly/react-core";
import "@patternfly/react-core/dist/styles/base.css";
import React from "react";
import "./App.css";
import EntityPicker from "./Entity/EntityPicker";
import RegionPicker from "./Region/RegionPicker";
import TagPicker from "./Tag/TagPicker";
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
            <RegionPicker />
          </FlexItem>
          <FlexItem>
            <TagPicker />
          </FlexItem>
          <FlexItem>
            <EntityPicker />
          </FlexItem>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
