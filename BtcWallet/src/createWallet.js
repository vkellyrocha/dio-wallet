//importando as dependências
const bip32 = require('bip32')
const bit39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal -mainnet
//const network = bitcoin.networks.bitcoin

//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD

//mainnet
//const path = `m/49'/0'/0'/0`

//testnet
const path = `m/49'/1'/0'/0`

//Criando o mnemonic para a seed (palavras de senha)
let mnemonic = bit39.generateMnemonic()
const seed = bit39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando umas conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddresss = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("endereço: ", btcAddresss)
console.log("Chave privada: ", node.toWIF());
console.log("Seed", mnemonic)

