const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

function getAddress(privateKey) {
    const pk = secp.getPublicKey(privateKey).slice(1)
    const hash = keccak256(pk)
    return toHex(hash.slice(12))
}

const PRIVATE_KEYS = ["52cd6bebd53fee72b44a40dfb4aa0b8cdb41690832ef12e009439e8768f4c18a", "7575849ffbac637797c9108e5976d73a8ecb6b461edc04b0d64451a8c1b9a97e", "61388125a2444bff1aae2a77335d21620815279bad44007ebe4749e36da990fd"]


function createBalances () {
    const balances = {}
    PRIVATE_KEYS.forEach((pk, idx) => {
        const address = getAddress(pk);
        balances[`0x${address}`] = (idx+1) * 100
    })
    return balances
}

const mockBalances = {
    "0x1": 100,
    "0x2": 50,
    "0x3": 75,
    };


module.exports = createBalances;