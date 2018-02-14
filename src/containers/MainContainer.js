import React, { Component } from 'react';
import { Container, Form } from 'semantic-ui-react';
import { allCoins, priceHistory } from '../lib/cryptocompare';

class MainContainer extends Component {
  state = {
    symbol: '',
  }

  componentDidMount = () => this.getCoins();

  getCoins = async () => {
    const coins = await allCoins();
    this.setState({ coins });
    this.setState({
      coinsOptions: coins.map((coin) => {
        const obj = { key: coin.Id, value: `${coin.Symbol}`, text: `${coin.Symbol}` };
        return obj;
      }),
    });
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleClick = () => priceHistory(this.state.symbol);

  render() {
    return (
      <Container>
        <Form>
          <Form.Dropdown
            search
            selection
            value={this.state.symbol}
            placeholder="Symbol"
            name="symbol"
            options={this.state.coinsOptions}
            onChange={this.handleChange}
          />
          <Form.Button
            content="OHLC"
            disabled={!this.state.symbol}
            onClick={this.handleClick}
          />
        </Form>
      </Container>
    );
  }
}

export default MainContainer;
