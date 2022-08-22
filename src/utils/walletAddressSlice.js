export const walletAddressSlice = (_walletAddress) => {
    return _walletAddress.slice(0,6)+"..."+_walletAddress.slice(-6)
}