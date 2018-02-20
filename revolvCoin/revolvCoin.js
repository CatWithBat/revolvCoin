const SHA256 = require('./node_modules/crypto-js/sha256');
const SHA384 = require('./node_modules/crypto-js/sha384');
const SHA512 = require('./node_modules/crypto-js/sha512');
const SHA1 = require('./node_modules/crypto-js/sha1');
const SHA3 = require('./node_modules/crypto-js/sha3');
const MD5 = require('./node_modules/crypto-js/md5');

class Block{
  constructor(index, timestamp, data, type, prev= ''){
    this.index = index;
    this.timestamp = Date();
    this.data = data;
    this.prev = prev;
    this.type = type;
    this.hash = this.calculateHash();
  }
  calculateHash(){
    var time = new Date();
    if(time.getUTCSeconds()<10){
      this.type = 256;
      return SHA256(this.index+this.prev+this.timestamp+JSON.stringify(this.data)).toString();
    }else if (time.getUTCSeconds()<20){
      return SHA384(this.index+this.prev+this.timestamp+JSON.stringify(this.data)).toString();
      this.type = 384;
    }else if (time.getUTCSeconds()<30){
      this.type = 512;
      return SHA512(this.index+this.prev+this.timestamp+JSON.stringify(this.data)).toString();
    }else if (time.getUTCSeconds()<40){
      this.type= 1;
      return SHA1(this.index+this.prev+this.timestamp+JSON.stringify(this.data)).toString();
    }else if (time.getUTCSeconds()<50){
      this.type = 3;
      return SHA3(this.index+this.prev+this.timestamp+JSON.stringify(this.data)).toString();
    }else{
      this.type = 5;
      return MD5(this.index+this.prev+this.timestamp+JSON.stringify(this.data)).toString();
    }

}
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }
  createGenesisBlock(){
    return new Block(0,'2/19/2018', 'Genesis Block', 0);
  }
  getLatestBlock(){
      return this.chain[this.chain.length - 1];
  }
  addBlock(newBlock){
    newBlock.prev = this.getLatestBlock().hash;
    newBlock.has = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let samplecoin = new Blockchain();
samplecoin.addBlock(new Block(1, {amount :5}));
samplecoin.addBlock(new Block(2, {amount :6}));

console.log(JSON.stringify(samplecoin), null, 4);
