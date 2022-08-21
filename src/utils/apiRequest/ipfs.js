import { useDispatch } from "react-redux";

const axios = require("axios").default;


export const uploadImage = (fileImg) => {
  if (fileImg) {
    try {
      const formData = new FormData();
      formData.append("file", fileImg);
      formData.append("pinataOptions", '{"cidVersion":"0"}');

      formData.append(
        "pinataMetadata",
        '{"name": "test.png", "keyvalues": {"company": "Pinata"}}'
      );

      const resFile = axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return resFile; //Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  }
};

export const UploadMetadata =  () => {
  const dispatch = useDispatch()
    const uploadMetadata = async (fileImg, name, description, image) => {
       
        const ImgHash = `ipfs://${image.data.IpfsHash}`;
        // console.log(ImgHash)
        const resJSON = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
          data: {
            name: name,
            description: description,
            image: ImgHash,
          },
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
          },
        });

        const ipfsUrls = "ipfs://" + resJSON.data.IpfsHash;
      

        return ipfsUrls;

    }  
    return {
        uploadMetadata
    }
};
