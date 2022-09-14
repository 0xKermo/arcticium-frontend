import { BigNumber } from 'ethers';
import { wlAddresses } from './wlAddreses';

const { MerkleTree } = require('merkletreejs')
// const keccak256 = require("keccak256");
const SHA256 = require('crypto-js/sha256')

export const checkWalletIsWl = (_wallet) => {
    const leaves = wlAddresses.map(x => SHA256(BigNumber.from(x.toLowerCase())._hex))
    const tree = new MerkleTree(leaves, SHA256)
    const root = tree.getRoot().toString('hex')
    const leaf = SHA256(_wallet.toLowerCase())
    const proof = tree.getProof(leaf)
    return tree.verify(proof, leaf, root)
}