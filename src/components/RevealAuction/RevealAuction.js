// @flow weak
import React, {Component} from 'react';
import moment from 'moment'
import {RevealAuctionForm} from './RevealAuctionForm';
import {RevealAuctionInfo} from './RevealAuctionInfo';
import {unsealBid} from '../../lib/ensService';
import {getDuringReveal} from '../../lib/util';
import './RevealAuction.css';

export class RevealAuction extends Component {
  // TODO gets startsAt and endsAt time by query
  // the auction data
  constructor(props) {
    super(props)
    this.state = {
      startsAt: '',
      endsAt: '',
      duringReveal: '',
      email: '',
      ethdBid: '',
      secret: '',
      gas: '',
      revealFormSent: '',
      revealTXHash: ''
    }
    this.setRevealFormSent = this.setRevealFormSent.bind(this);
    this.setRevealTXHash = this.setRevealTXHash.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handelRevealFormSubmit = this.handelRevealFormSubmit.bind(this);
  }

  componentDidMount() {
    // TODO
    // request api to get startsAt and endsAt
    // for instance :
    // const startsAt = moment().add(3, 'days').format('dddd, MMMM D YYYY, h:mm:ss a z');
    // const endsAt = moment().add(6, 'days').format('dddd, MMMM D YYYY, h:mm:ss a z');
    const startsAt = '';
    const endsAt = '';
    this.setState({
      startsAt,
      endsAt
    });
    const duringReveal = getDuringReveal(startsAt, endsAt);
    this.setState({duringReveal});
  }

  setRevealFormSent(state) {
    this.setState({revealFormSent: state})
  }

  setRevealTXHash(txHash) {
    this.setState({revealTXHash: txHash})
  }

  handleInputChange(event) {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handelRevealFormSubmit(event) {
    event.preventDefault();
    const {email, ethBid, secret} = this.state;
    const privateKey = this.props.privateKey;
    let txHash = unsealBid(this.props.searchResult.searchName, ethBid, secret, privateKey)
    this.setRevealTXHash(txHash);
    this.setRevealFormSent('sent');
  }

  revealAutionInfo = () => (
    <RevealAuctionForm
      {...this.props}
      duringReveal={this.state.duringReveal}
      startsAt={this.state.startsAt}
      endsAt={this.state.endsAt}
      setRevealFormSent={this.setRevealFormSent}
      setRevealTXHash={this.setRevealTXHash}
      handleInputChange={this.handleInputChange}
      handelRevealFormSubmit={this.handelRevealFormSubmit}
    />
  );

  revealAuctionForm = () => (
    <RevealAuctionInfo
      searchName={this.props.searchResult.searchName}
      switchPage={this.props.switchPage}
      setStep={this.props.setStep}
      {...this.state}
    />
  );

  render = () => this.state.revealFormSent === 'sent' ?
  this.revealAutionInfo() : this.revealAuctionForm();
}