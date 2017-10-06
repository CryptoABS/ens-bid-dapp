import React from 'react';
import './StartAuctionInfo.css';

export const StartAuctionInfo = (props) => (
  <div>
    <h2>{props.searchName}.eth</h2>
    <div>
      <div>
        <div>Email: </div>
        <div>
          {props.email}
        </div>
      </div>
      <div>
        <div>ETH: </div>
        <div>
          {props.ethBid}
        </div>
      </div>
      <div>
        <div>Secert: </div>
        <div>
          {props.secret}
        </div>
      </div>
      <div>
        <div>TxHash: </div>
        <div>
          {props.auctionTXHash}
        </div>
      </div>
      <p>We've send you the auction information Email.</p>
    </div>
    <div>
      <button onClick={() => props.switchPage('main')}>Back to Search</button>
      <button>My ENS List</button>
    </div>
  </div>
);