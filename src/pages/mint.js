import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import $ from "jquery";
import { uploadImage, UploadMetadata } from "../utils/apiRequest/ipfs";
import { MintErc721 } from "../hooks";
import { ToastPromise } from "../components/toast";
import { Toaster } from "react-hot-toast";
import { Provider } from "starknet";
import { useMutation } from "@apollo/client";
import { uploadToMetadata } from "../grqphql/mutation";
import { useSelector } from "react-redux";
import SliderMainZero from "../components/SliderMainZero";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #403f83;
    border-bottom: solid 1px #403f83;
  }
  header#myHeader.navbar .search #quick_search{
    color: #000;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #000;
  }
  header#myHeader .dropdown-toggle::after{
    color: #000;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
  .mainside{
    .logout{
      display: flex;
      align-items: center;
    }
  }
  @media only screen and (max-width: 1199px) {
    .item-dropdown .dropdown a{
      color: #fff !important;
    }
  }
  .nft_preview_item {
    width: 100%;
    height:100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nft_preview_item img{
    width: 100%;
    height:100%
  }
`;

const Mint = () => {
  const [files, setFiles] = useState();
  const [fileName, setFileName] = useState();
  const { walletAddress } = useSelector((state) => state.wallet);

  const { mintErc721 } = MintErc721();
  const { uploadMetadata } = UploadMetadata();
  const [addAsset] = useMutation(uploadToMetadata);
  const onChange = (e) => {
    var file = e.target.files;
    // document.getElementById("file_name").style.display = "none";
    setFiles(file);
    setFileName(file[0].name);

    if (file && file[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#get_file_2").attr("src", e.target.result);
      };

      reader.readAsDataURL(file[0]);
    }
  };
  const sendFileToIPFS = async () => {
    const name = $("#item_name").val();
    const description = $("#item_desc").val();
    const fileImg = files[0];
    const image = await uploadImage(fileImg);
    const metadata = uploadMetadata(fileImg, name, description, image);
    const loadingText = "Uploading to IPFS";
    const successText = "Uploaded to IPFS";
    const ipfsFunc = () => {};
    ToastPromise(metadata, loadingText, successText, ipfsFunc);
    const mintPromise = await mintErc721(metadata);
    const mintLoadingText = "Transaction pending...";
    const voyagerLink = `https://beta-goerli.voyager.online/tx/${mintPromise.tr}`;
    const mintSuccessText = `NFT succesfully minted`;
    const provider = new Provider();
    const tx = provider.waitForTransaction(mintPromise.transaction_hash);
    const imageUrl = `https://arcswap.mypinata.cloud/ipfs/${image.data.IpfsHash}`;
    tx.then((res) => {
      addAsset({
        variables: {
          assetOwner: walletAddress,
          name: name,
          description: description,
          image: imageUrl,
        },
      });
    });

    ToastPromise(tx, mintLoadingText, mintSuccessText);
  };

  return (
    <div>
      <GlobalStyles />

      
      <section className="jumbotron no-bg bg-gray">
         <SliderMainZero text={"Mint Nft"}/>
      </section>


      <section className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">

                  <p>{fileName}</p>

                  <div className="browse">
                    <input
                      type="button"
                      id="get_file"
                      className="btn-main"
                      value="Upload"
                    />
                    <input
                      id="upload_file"
                      type="file"
                      multiple
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="spacer-single"></div>

                <h5>Name</h5>
                <input
                  type="text"
                  name="item_name"
                  id="item_name"
                  className="form-control"
                />

                <div className="spacer-10"></div>

                <h5>Description</h5>
                <textarea
                  data-autoresize
                  name="item_desc"
                  id="item_desc"
                  className="form-control"
                ></textarea>

                <div className="spacer-10"></div>

                <input
                  type="button"
                  id="submit"
                  className="btn-main"
                  value="Create Item"
                  onClick={sendFileToIPFS}
                />
                <Toaster position="bottom-center" reverseOrder={true} />
              </div>
            </form>
          </div>

          <div className="col-lg-3 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0" style={{ height: "300px" }}>
              <div className="nft_preview_item">
                <img src="./img/items/default-img.png" id="get_file_2" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mint;
