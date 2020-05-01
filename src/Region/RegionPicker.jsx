import { regionsWithEvents } from './regions'

import React from 'react'
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core'

class RegionPicker extends React.Component {
  constructor(props) {
    super(props)
    this.options = regionsWithEvents.map((region) => ({
      value: region,
      disabled: false,
    }))

    this.state = {
      isExpanded: false,
      isPlain: true,
      selected: [],
    }

    this.onToggle = (isExpanded) => {
      this.setState({
        isExpanded,
      })
    }

    this.onSelect = (event, selection) => {
      const { selected } = this.state
      if (selected.includes(selection)) {
        this.setState(
          (prevState) => ({
            selected: prevState.selected.filter((item) => item !== selection),
          }),
          () => console.log('selections: ', this.state.selected)
        )
      } else {
        this.setState(
          (prevState) => ({ selected: [...prevState.selected, selection] }),
          () => console.log('selections: ', this.state.selected)
        )
      }
    }

    this.clearSelection = () => {
      this.setState({
        selected: [],
        isExpanded: false,
      })
    }
  }

  render() {
    const { isExpanded, isPlain, selected } = this.state
    const titleId = 'plain-typeahead-select-id'

    return (
      <div>
        <span id={titleId} hidden>
          Select one or multiple areas
        </span>
        <Select
          variant={SelectVariant.typeaheadMulti}
          ariaLabelTypeAhead='Select one or multiple areas'
          onToggle={this.onToggle}
          onSelect={this.onSelect}
          onClear={this.clearSelection}
          selections={selected}
          isExpanded={isExpanded}
          isPlain={isPlain}
          ariaLabelledBy={titleId}
          placeholderText='Select one or multiple areas'
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
    )
  }
}

export default RegionPicker
