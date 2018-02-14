import React, { Component } from 'react';
import { Container, Form } from 'semantic-ui-react';
import { CSVLink } from 'react-csv';
import { allCoins, priceHistory } from '../lib/cryptocompare';


class MainContainer extends Component {
  state = {
    symbol: '',
    coins: [],
    coin: '',
    prices: [],
    inputDis: false,
  }

  componentDidMount = () => this.getCoins();

  getCoins = async () => {
    const coins = await allCoins();
    this.setState({
      coins,
      coinsOptions: coins.map((coin) => {
        const obj = { key: coin.Id, value: `${coin.Symbol}`, text: `${coin.Symbol}` };
        return obj;
      }),
    });
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value,
      coin: this.state.coins.find(coin => coin.Symbol === value),
    });
  };

  handleClick = async () => {
    const prices = await priceHistory(this.state.symbol);
    this.setState({ prices, inputDis: true });
  }

  convertDate = (date) => {
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return [
      year,
      (month > 9 ? '' : '0') + month,
      (day > 9 ? '' : '0') + day,
    ].join('');
  }

  render() {
    const headers = [
      { label: 'Date', key: 'date' },
      { label: 'Open', key: 'open' },
      { label: 'High', key: 'high' },
      { label: 'Low', key: 'low' },
      { label: 'Close', key: 'close' },
      { label: 'Volume', key: 'volume' },
    ];

    const data = this.state.prices.map((price) => {
      const date = this.convertDate(new Date(price.time * 1000));
      const obj = {
        date: parseInt(date, 10),
        open: price.open,
        high: price.high,
        low: price.low,
        close: price.close,
        volume: price.volumefrom,
      };
      return obj;
    });

    return (
      <Container>
        <Form>
          <Form.Dropdown
            label="Pick a Coin"
            search
            selection
            value={this.state.symbol}
            placeholder="Symbol"
            name="symbol"
            options={this.state.coinsOptions}
            onChange={this.handleChange}
            disabled={this.state.inputDis}
          />
          <Form.Group>
            <Form.Button
              content="Get Trade History"
              disabled={!this.state.symbol || !!this.state.prices[0]}
              onClick={this.handleClick}
            />
            <Form.Button
              disabled={!this.state.prices[0]}
              onClick={() => this.setState({ inputDis: true })}
            >
              <CSVLink
                headers={headers}
                data={data}
                filename={`${this.state.symbol}.csv`}
              >
                Download
              </CSVLink>
            </Form.Button>
            <Form.Button
              content="Reset"
              onClick={() => this.setState({
                symbol: '',
                prices: [],
                inputDis: false,
              })}
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default MainContainer;
