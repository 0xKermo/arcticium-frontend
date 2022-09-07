import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Activity from "../components/collectionActivity";
import ColumnSwap from "../components/explorerColumnSwap";
import { getCollection } from "../grqphql/query";

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
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #fff;
    }
    .item-dropdown .dropdown a{
      color: #000 !important;
    }
  }
`;
const Collection = function () {
  const { contract } = useParams();
  const [imgUrls, setImgUrls] = useState([]);
  const { loading, error, data } = useQuery(getCollection, {
    variables: {
      collectionAddress: contract,
    },
  });
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = (): void => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = (): void => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
  };

  useEffect(() => {
    const prepare = async () => {
      // const tokenIds =[
      //   "2270848422125323085359874136672890433162799864094809492304241408379547811840",
      //   "2101044568154481062897470114561017956862387650662892455178924183664707239936",
      //   "615090189624839546596720832609673003197135506589678716505636721262868824064",
      //   "2656801161106692631414971222278355048647794371838790564624243291740306407424",
      //   "1970857310778259642189264595359067136978695839849366954287600603280491675648",
      //   "734148720879434875049240634485396969786243159011944536458855777185826865152",
      //   "847582381706158841217720272994818205781910836482431299164306149365721858048",
      //   "3147886094081971406030668799351049071085766729960073272494401314190532804608",
      //   "1764000808766993823891563827712893952042197242041423639897087783303699759104",
      //   "3494970378803717066817791144178187219994980411417971695032810181565448454144",
      //   "3501900097712953766032292197170001443606545346992960797855910197245824204800",
      //   "2932132390869282871675091424969326794242236135966034703039043022792972828672",
      //   "1350140546677814583438623035137146986545460149866096268223769770116494917632",
      //   "924140302937752767963737056882170594691221673263876946326813872451152248832",
      //   "337157752091300182667034806282053164078043557573386216244348730957629489152",
      //   "1075010450534951824967420951788379932207345527531227484840298426951144570880",
      //   "256280701271785136590383646838787414592023478894593957923969211960561500160",
      //   "1507915702198516610176871225028484041978735153645812172949637316029882302464",
      //   "3454921725634837575454290506185653191711806784829998865327938588768198459392",
      // ]
      // const tokenIds=[
      //   "331",
      //   "323",
      //   "333","433","533","336","337","338","339","310","311","312","313","314","315","316","317","318","319","320","321"
      // ]
      // const metaDatas= tokenIds.map((tokenId,i) => {
      //   const res =  getTestTokenURI(contract,tokenId)
      //   return res
      // })
      // const result =await Promise.all(metaDatas)
      // const imageUrls = result.map((item,i) => {
      //   return item.image
      // })
      // setImgUrls(imageUrls)
    };

    // prepare()
  }, [contract]);

  useEffect(() => {
    if (!loading) {
      console.log(data.getTradeWithContractAddress);
    }
  }, [loading]);

  return (
    <div>
      <GlobalStyles />

      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{ backgroundImage: `url(/${!loading ? data.collection.bannerPath : null})` }}
      >
        <div className="mainbreadcumb"></div>
      </section>

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-8">
            <div className="d_profile de-flex left">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <img src={!loading ?"/"+ data.collection.profileImgPath : null} alt="" />
                  <div className="profile_name">
                    <h4>
                      {!loading ? data.collection.collectionName : null}
                      <span className="profile_username"></span>
                      <span id="wallet" className="profile_wallet">
                        {!loading ? data.collection.collectionAddress : null}
                      </span>
                      <button id="btn_copy" title="Copy Text">
                        copy
                      </button>
                    </h4>
                    <span>{!loading ? data.collection.bio : null}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d_profile de-flex right">
              <div className="de-flex-col">
                <div className="collection-social-icons">
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-facebook fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-twitter fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-linkedin fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-pinterest fa-lg"></i>
                  </span>
                  <span onClick={() => window.open("", "_self")}>
                    <i className="fa fa-rss fa-lg"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>NFT's</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Activity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {openMenu && !loading && (
          <div id="zero1" className="onStep fadeIn">
            <ColumnSwap data={data.getTradeWithContractAddress} />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <Activity />
          </div>
        )}
      </section>
    </div>
  );
};
export default Collection;
