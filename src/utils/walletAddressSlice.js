export const walletAddressSlice = (_walletAddress,start,end) => {
    try {
        return _walletAddress.slice(0,start)+"..."+_walletAddress.slice(-end)
        
    } catch (error) {
        return null
    }
}