import {strToShortStringFelt} from "../encode"
const axios = require('axios').default;

const splitStrtoFeltArray = (string) => {
    const max_felt_length = 31
    const string_langth = string.length
    console.log(string_langth)
    const feltArray = []
    var k = 0
    if (string_langth > max_felt_length) {
        const iterasyon = Math.floor(string_langth / max_felt_length);

        for (var i = 0; i <= iterasyon; i++) {
            feltArray.push(strToShortStringFelt(string.slice(k, k + max_felt_length)))
            k += max_felt_length
        }
        
    }else{
        feltArray.push(string)
    }
    return feltArray
   
}


const uploadImage = (fileImg) => {

    if (fileImg) {
        try {

            const formData = new FormData();
            formData.append("file", fileImg);
            formData.append('pinataOptions', '{"cidVersion":"0"}');

            formData.append('pinataMetadata', '{"name": "test.png", "keyvalues": {"company": "Pinata"}}');

            const resFile = axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                    'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                    "Content-Type": "multipart/form-data"
                },
            });

            return resFile            //Take a look at your Pinata Pinned section, you will see a new file added to you list.  

        } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
        }
    }
}

export const uploadMetadata = async (fileImg, name, description) => {
    const image = await uploadImage(fileImg)
    const ImgHash = `ipfs://${image.data.IpfsHash}`;
    // console.log(ImgHash)
    const resJSON = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
            "name": name,
            "description": description,
            "image": ImgHash
        },
        headers: {
            'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
        },
    });
    // const testStr = "QmVN4tqCMgyiTafTo8YwYrZqDYTsQ7cH3qhQsHU2CPBHwm"
    console.log("feltArray",resJSON.data.IpfsHash)

    const feltArray = splitStrtoFeltArray("ipfs://" + resJSON.data.IpfsHash)
    console.log("feltArray",feltArray)
    // const feltArray = splitStrtoFeltArray("ipfs://" + testStr)
    return feltArray
}

