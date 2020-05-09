import { Select, SelectOption, SelectVariant } from '@patternfly/react-core'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectRegion, unSelectRegion } from '../Region/regionActions'
import { getSelectedRegions } from '../Region/regionSelectors'
import { regionsWithEvents } from './regions'

class RegionPicker extends Component {
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
        const { selectRegion } = this.props
        selectRegion({ region: selection })

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

const mapStateToProps = (state) => ({
  regions: getSelectedRegions(state),
})
const mapDispatchToProps = (dispatch) => {
  return {
    selectRegion: (region) => dispatch(selectRegion(region)),
    unSelectRegion: (region) => dispatch(unSelectRegion(region)),
  }
}
const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(RegionPicker)
