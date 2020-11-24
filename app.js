// kantor walut na dzien 5.11.2020

const Cash = (props) => {
  const value = ((props.cash / props.ratio) * props.price).toFixed(2);
  return (
    <div>
      {props.title} {props.cash <= 0 ? "" : value}
    </div>
  );
};

class ExchangeCounter extends React.Component {
  state = {
    amount: "",
    product: "gas",
  };

  static defaultProps = {
    currencies: [
      {
        id: 0,
        name: "zloty",
        ratio: 1,
        title: "Wartosc w zlotowkach:",
      },
      {
        id: 1,
        name: "dollar",
        ratio: 3.81,
        title: "Wartosc w dollarach:",
      },
      {
        id: 2,
        name: "euro",
        ratio: 4.52,
        title: "Wartosc w euro:",
      },
      {
        id: 3,
        name: "dollar",
        ratio: 0.58,
        title: "Wartosc w chinskich Yuan:",
      },
      {
        id: 4,
        name: "pound",
        ratio: 5.0,
        title: "Wartosc w funtach:",
      },
    ],
    // ceny jakie sa np. pradu benzyny pomaranczy
    prices: {
      electricity: 0.51,
      gas: 4.76,
      oranges: 3.79,
    },
  };

  handleChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleSelect = (e) => {
    this.setState({
      product: e.target.value,
      amount: "",
    });
  };

  insertSuffix(select) {
    if (select === "electricity") return <em> kWh</em>;
    else if (select === "gas") return <em> literow</em>;
    else if (select === "oranges") return <em> kg</em>;
    else return null;
  }

  selectPrice(select) {
    const price = this.props.prices[select];

    return price;
  }

  render() {
    const { amount, product } = this.state;
    // destrukturyzacja
    const price = this.selectPrice(product);
    const calculators = this.props.currencies.map((currency) => (
      <Cash
        key={currency.id}
        ratio={currency.ratio}
        title={currency.title}
        cash={amount}
        price={price}
      />
    ));

    return (
      <>
        <div className="app">
          <h3 className="title">
            Witaj na lekcji 51 Kantor walut rozbudowa seckcji
          </h3>

          <h2 className="">Kalkulator(prad, benzyna, pomarancze)</h2>
          <div className="wybierz">
            <label className="product">
              Wybierz produkt:
              <select value={product} onChange={this.handleSelect}>
                <option value="electricity">prad</option>
                <option value="gas">benzyna</option>
                <option value="oranges">pomarancze</option>
              </select>
            </label>
          </div>
          <br />
          <label className="kg">
            <input type="number" value={amount} onChange={this.handleChange} />
            {this.insertSuffix(this.state.product)}
          </label>
          <div className="cash">{calculators}</div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<ExchangeCounter />, document.getElementById("root"));
