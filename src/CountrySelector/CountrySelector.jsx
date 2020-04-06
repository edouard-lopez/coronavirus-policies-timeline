import {countryNames} from "../data/data.ts";

import React from "react";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";

class CountrySelector extends React.Component {
  constructor(props) {
    super(props);
    this.options = countryNames.map(country => ({
      value: country,
      disabled: false
    }));

    this.state = {
      isExpanded: false,
      isPlain: true,
      selected: []
    };

    this.onToggle = isExpanded => {
      this.setState({
        isExpanded
      });
    };

    this.onSelect = (event, selection) => {
      const { selected } = this.state;
      if (selected.includes(selection)) {
        this.setState(
          prevState => ({
            selected: prevState.selected.filter(item => item !== selection)
          }),
          () => console.log("selections: ", this.state.selected)
        );
      } else {
        this.setState(
          prevState => ({ selected: [...prevState.selected, selection] }),
          () => console.log("selections: ", this.state.selected)
        );
      }
    };

    this.clearSelection = () => {
      this.setState({
        selected: [],
        isExpanded: false
      });
    };
  }

  render() {
    const { isExpanded, isPlain, selected } = this.state;
    const titleId = "plain-typeahead-select-id";

    return (
      <div>
        <span id={titleId} hidden>
          Select a state
        </span>
        <Select
          variant={SelectVariant.typeaheadMulti}
          ariaLabelTypeAhead="Select a state"
          onToggle={this.onToggle}
          onSelect={this.onSelect}
          onClear={this.clearSelection}
          selections={selected}
          isExpanded={isExpanded}
          isPlain={isPlain}
          ariaLabelledBy={titleId}
          placeholderText="Select a state"
        >
          {this.options.map((option, index) => (
            <SelectOption
              isDisabled={option.disabled}
              key={index}
              value={option.value}
            />
          ))}
        </Select>
      </div>
    );
  }
}

export default CountrySelector;
