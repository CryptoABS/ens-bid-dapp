import React, {Component} from 'react';
import {Main} from './components/Main';
import Warnings from './components/Warnings';
import Top from './components/Top/Top';
import {StartAuction} from './components/StartAuction/StartAuction';
import Footer from './components/Footer/Footer';
import {getAddressBalance} from './lib/dAppService';
import 'typeface-roboto';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: '',
      source: 'metamask'
    };
    this.setAccount = this.setAccount.bind(this);
    this.setEmptyAccount = this.setEmptyAccount.bind(this);
    this.setSource = this.setSource.bind(this);
  }

  setSource(type) {
    this.setState({source: type});
  }

  setAccount(account) {
    const balance = getAddressBalance(account);
    this.setState({account, balance});
  }

  setEmptyAccount() {
    this.setState({account: '', balance: ''});
  }

  render() {
    return (
      <div className="App">
        <Top
          {...this.state}
          setAccount={this.setAccount}
          setEmptyAccount={this.setEmptyAccount}
          setSource={this.setSource}
        /> 
        {process.env.REACT_APP_PROVIDER
          ? <Main/>
          : <Warnings/>}
          <StartAuction/>
        <Footer/>
      </div>
    );
  }
}

export default App;
