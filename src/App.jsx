import React from "react";
import injectSheet from "react-jss";
import { normalize, schema } from "normalizr";
import { find, popular, findFrom50 } from "./service";
import ComboBox from "./components/ComboBox";

const styles = {
  "@global": {
    "*": {
      boxSizing: "border-box"
    }
  }
};

const mapCity = ({ Id, City }) => ({ key: Id, value: City });
const normalizeCities = cities => normalize(cities, itemsSchema);
const mapResult = result => ({
  items: normalizeCities(result.data.map(mapCity)),
  totalCount: result.totalCount || 0
});

const item = new schema.Entity(
  "items",
  {},
  {
    idAttribute: "key"
  }
);
const itemsSchema = [item];

const getAutocompleteItems = query => findFrom50(query).then(mapResult);

const getDropDownItems = query => find(query).then(mapResult);

const getPopular = query =>
  query && query.length ? Promise.resolve([]) : popular();

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
          onChange={this.onValueChanged}
          name="cb1"
        />
        <h3>Автокомплит</h3>
        <ComboBox
          autocomplete
          loadPopular={getPopular}
          loadItems={getAutocompleteItems}
          onChange={this.onValueChanged}
          name="cb2"
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
