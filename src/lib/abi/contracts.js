import {
  ensAbiArray,
  auctionRegistrarAbiArray,
  deedAbiArray,
  fifsRegistrarAbiArray,
  resolverAbiArray,
  reverseRegistrarAbiArray
} from './abiArray';

const Web3 = require('web3');
const web3 = new Web3();

console.log("PROVIDER", process.env.REACT_APP_PROVIDER);

web3.setProvider(new web3.providers.HttpProvider(process.env.REACT_APP_PROVIDER));

//TODO: should move to util.js ?
export const getHexHash = (hash) => web3.sha3(hash, {encoding: 'hex'});

export const getHash = (hash) => web3.sha3(hash);

export const getNameHexHash = (name) => {
  let node = '0x0000000000000000000000000000000000000000000000000000000000000000';
  if (name === '') return node;

  for (const label of name.split('.').reverse()) {
    const more = getHash(label).slice(2);
    node = getHexHash(node + more);
  }

  return node;
};

// Get ensContract instance
export const ens = () => {
  const ensContract = web3.eth.contract(ensAbiArray);

  // instantiate by address
  return  ensContract.at(process.env.ENS_ADDRESS);
};

export const ethRegistrar = () => {
  const name = getNameHexHash('eth');
  const address = ens().owner(name);
  const auctionRegistrarContract = web3.eth.contract(auctionRegistrarAbiArray);
  return auctionRegistrarContract.at(address);  
};

export const testRegistrar = () => {
  const name = getNameHexHash('test');
  const address = ens().owner(name);
  const fifsRegistrarContract = web3.eth.contract(fifsRegistrarAbiArray);
  return fifsRegistrarContract.at(address);  
};


function Contracts() {}

Contracts.prototype.namehash = function(name) {
    var node = '0x0000000000000000000000000000000000000000000000000000000000000000';
    if (name !== '') {
        var labels = name.split(".");
        for(var i = labels.length - 1; i >= 0; i--) {
            node = web3.sha3(node + web3.sha3(labels[i]).slice(2), {encoding: 'hex'});
        }
    }
    return node.toString();
}

const ensContract = web3.eth.contract(ensAbiArray);

Contracts.prototype.ens = ensContract.at(process.env.ENS_ADDRESS);

const auctionRegistrarContract = web3.eth.contract(auctionRegistrarAbiArray);

Contracts.prototype.ethRegistrar = auctionRegistrarContract.at(Contracts.prototype.ens.owner(Contracts.prototype.namehash('eth')));

const deedContract = web3.eth.contract(deedAbiArray);

const fifsRegistrarContract = web3.eth.contract(fifsRegistrarAbiArray);

Contracts.prototype.testRegistrar = fifsRegistrarContract.at(Contracts.prototype.ens.owner(Contracts.prototype.namehash('test')));

const resolverContract = web3.eth.contract(resolverAbiArray);

Contracts.prototype.getAddr = function(name) {
  var node = Contracts.prototype.namehash(name)
  var resolverAddress = Contracts.prototype.ens.resolver(node);
  if (resolverAddress === '0x0000000000000000000000000000000000000000') {
    return resolverAddress;
  }
  return resolverContract.at(resolverAddress).addr(node);
}

let publicResolverAddress = process.env.REACT_APP_PUBLIC_RESOLVER || Contracts.prototype.getAddr('resolver.eth');
Contracts.prototype.publicResolver = resolverContract.at(publicResolverAddress);

const reverseRegistrarContract = web3.eth.contract(reverseRegistrarAbiArray);
Contracts.prototype.reverseRegistrar = reverseRegistrarContract.at(Contracts.prototype.ens.owner(Contracts.prototype.namehash('addr.reverse')));

Contracts.prototype.getContent = function(name) {
  var node = Contracts.prototype.namehash(name)
  var resolverAddress = Contracts.prototype.ens.resolver(node);
  if (resolverAddress === '0x0000000000000000000000000000000000000000') {
    return "0x0000000000000000000000000000000000000000000000000000000000000000";
  }
  return resolverContract.at(resolverAddress).content(node);
}

export const contracts = new Contracts();
