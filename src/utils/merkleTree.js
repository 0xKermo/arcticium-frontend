import { BigNumber } from 'ethers';
import { wlAddresses } from './wlAddreses';

const { MerkleTree } = require('merkletreejs')
// const keccak256 = require("keccak256");
const SHA256 = require('crypto-js/sha256')

export const checkWalletIsWl = (_wallet) => {
    console.log(_wallet)
    const leaves = wlAddresses.map(x => SHA256(BigNumber.from(x.toLowerCase())._hex))
    const tree = new MerkleTree(leaves, SHA256)
    const root = tree.getRoot().toString('hex')
    const leaf = SHA256(BigNumber.from(_wallet.toLowerCase())._hex)
    const proof = tree.getProof(leaf)
    const  verify = tree.verify(proof, leaf, root)
    console.log("verify",verify)
    return verify
}