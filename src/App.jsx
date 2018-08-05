import React from "react";
import injectSheet from "react-jss";
import { find, /*popular,*/ findFrom50 } from "./service";
import ComboBox from "./components/ComboBox";

const styles = {
  "@global": {
    "*": {
      boxSizing: "border-box"
    }
  }
};

const mapCity = ({ Id, City }) => ({ key: Id, value: City });
const mapResult = result => ({
  items: result.data.map(mapCity),
  totalCount: result.totalCount || 0
});

const getDropDownItems = query => findFrom50(query).then(mapResult);

const getAutocompleteItems = query => find(query).then(mapResult);

const getAutocompleteItemsWithError = query =>
  find(query, 5, 0, true).then(mapResult);

// const getPopular = query =>
//   query && query.length
//     ? Promise.resolve([])
//     : popular().then(items => items.map(mapCity));

class App extends React.Component {
  state = {
    value: null
  };

  onValueChanged = value => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <div className="App">
        <h2>Пример работы контроля ComboBox</h2>
        <h3>Выпадающий список</h3>
        <ComboBox
          loadItems={getDropDownItems}
          onValueChange={this.onValueChanged}
          name="cb1"
          value={value}
        />
        <h3>Автокомплит</h3>
        <ComboBox
          autocomplete
          //loadPopular={getPopular}
          loadItems={getAutocompleteItems}
          onValueChange={this.onValueChanged}
          name="cb2"
          value={value}
        />
        <h3>Автокомплит c возможной ошибкой</h3>
        <ComboBox
          autocomplete
          loadItems={getAutocompleteItemsWithError}
          onValueChange={this.onValueChanged}
          name="cb2"
          value={value}
        />
        <br />
        <br />
        <br />
        <label>Выбранное значение: {value && value.value}</label>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
