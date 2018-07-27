import React from "react";
import injectSheet from "react-jss";
import { find, popular } from "./service";
import ComboBox from "./components/ComboBox";
import ListLabel from "./components/ListLabel";
import Separator from "./components/Separator";

const styles = {
  "@global": {
    "*": {
      boxSizing: "border-box"
    }
  }
};

// const placeholderWithArrow = "Введите или выберите из списка";
// const placeholderWithoutArrow = "Начните вводить код или название";

let mapCity = ({ Id, City }) => ({
  key: Id,
  value: City
});

let renderTotalCount = (foundCount, totalCount) =>
  foundCount < totalCount ? (
    <ListLabel key="label">
      Показано {foundCount} из {totalCount} найденных городов.
    </ListLabel>
  ) : (
    []
  );

let getItems = async query => {
  const { data, totalCount } = await find(query),
    items = data.map(mapCity),
    popularItems = query.length ? [] : await popular();

  return [].concat(
    popularItems.map(mapCity),
    popularItems.length ? <Separator key="separator" /> : [],
    items,
    renderTotalCount(items.length, totalCount)
  );
};

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
          getItems={getItems}
          onChange={this.onValueChanged}
          value={value}
          name="cb1"
        />
        <h3>Автокомплит</h3>
        <ComboBox
          autocomplete
          getItems={getItems}
          onChange={this.onValueChanged}
          value={value}
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
