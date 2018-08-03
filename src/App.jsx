import React from "react";
import injectSheet from "react-jss";
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
const mapResult = result => ({
  items: result.data.map(mapCity),
  totalCount: result.totalCount || 0
});

const getAutocompleteItems = query => find(query).then(mapResult);

const getDropDownItems = query => findFrom50(query).then(mapResult);

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
