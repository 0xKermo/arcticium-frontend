import { useSelector } from "react-redux";
import { hash, number } from "starknet";

export const SignMessage = () => {
    const { walletAddress, account } = useSelector((state) => state.wallet);

    const signMessages = async(signableMessage) =>{

        console.log(account)
        let signature = await account.account.signMessage(signableMessage);
        try {
            let response = await account.account.verifyMessage(signableMessage, signature);
            console.log("response",response)
            return signature
        } catch (err) {
            console.log("error",err)
        }
  
    }
return {
    signMessages
}
}