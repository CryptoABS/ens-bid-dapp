import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest'
import Search from 'material-ui-icons/Search';
import './SearchBar.css';
import {getAddressByEns, entries} from '../../lib/ensService';

const names = [
  'Brian',
  'Caley',
  'Casey',
  'Caroline',
  'Chris',
  'David',
  'Misha'  
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return names.filter(name => regex.test(name));
}

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => suggestion;

const renderInputComponent = inputProps => (
  <div className="inputContainer">
    <Search className="icon" />
    <input {...inputProps} />
  </div>
);

class SearchBar extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      address: 'ethereum.eth',
      name: 'ethereum',
      data: null,
      entriesData: null,
    };
  }

  getDataFromAddressByEns = async () => {
    try {
      const data = getAddressByEns(this.state.address);
      this.setState({ data });
      console.log('getDataFromAddressByEns', data)
    } catch (error) {
      console.error(`getDataFromAddressByEns error: ${error} `);
      this.setState({ data: error });
    }
  }

  getDataFromEntries = async () => {
    try {
      const entriesData = entries(this.state.name);
      this.setState({ entriesData });
      console.log('getDataFromEntries', entriesData)
    } catch (error) {
      console.error(`getDataFromEntries error: ${error} `);
      this.setState({ entriesData: error });
    }
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
    // TODO chech the ens function
    this.getDataFromAddressByEns();
    this.getDataFromEntries();
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search your ENS name",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
      />
    );
  }
}

export default SearchBar;