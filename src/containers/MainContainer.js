import React, { Component } from 'react';
import { Container, Form } from 'semantic-ui-react';
import allCoins from '../lib/cryptocompare';

class MainContainer extends Component {
  state = {
    symbols: '',
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

  render() {
    return (
      <Container>
        <Form>
          <Form.Dropdown
            search
            selection
            multiple
            value={this.state.symbols}
            placeholder="Symbols"
            name="symbols"
            options={this.state.coinsOptions}
            onChange={this.handleChange}
            />
        </Form>
      </Container>
    );
  }
}

export default MainContainer;
