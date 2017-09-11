import React, {Component} from 'react';
import {getAllowedTime, startAuction} from '../../lib/ensService';

/**
 * ENS FLOW: https://docs.ens.domains/en/latest/userguide.html
 *
 * ENS Bid Flow
 *   STEP 1: Check `entries`
 *   STEP 2: `startAuction`
 *   STEP 3: Check `entries` and `newBid`
 *   STEP 4: Check `entries` and `unsealBid`
 *   STEP 5: Check `entries` and `finalizeAuction`
 */

class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      // TODO: 未來要改成跟使用者上傳json與密碼合成的privateKey
      privateKey: ''
    };
  }

  // STEP 2: 開標


  render() {
    const result = this.props.result;
    return result &&
      (
        <div className="SearchEth-result">
          <div className="SearchEth-result-name">
            <h3>{result.searchName}.eth</h3>
          </div>
          <div className="SearchEth-result-action">
            <h3>{result.state}</h3>
          </div>
        </div>
      )
  }
}

export default SearchResult;