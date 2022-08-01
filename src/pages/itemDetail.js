import React, { useState, useEffect } from "react";
import Clock from "../components/clock";
import { createGlobalStyle } from "styled-components";
import { tradeType } from "../constants/filters";
import { useDispatch, useSelector } from "react-redux";
import { GetTokenURI, GetOwnerOf } from "../hooks";
import { _fetchData } from "ethers/lib/utils";
import {
       useParams
  } from "react-router-dom";
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const ItemDetail = function (props) {
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [voyagerLink, setVoyagerLink] = useState(0);
  const [nftInfo, setNftInfo] = useState({
    name: "",
    description: "",
    contract_address: "",
    image: "",
  });
  const [is_owner, setIsOwner] = useState(0);
  const { getTokenURI } = GetTokenURI();
  const { getOwnerOf } = GetOwnerOf();
  const { walletAddress } = useSelector((state) => state.wallet);
  const [isOpenTrade, setIsOpenTrade] = useState(false);

  const {contract,id} =  useParams();


  const dispatch = useDispatch();

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

  useEffect( () => {
    const prepare = async () => {
        const res = await getOwnerOf(contract, id);
        if (walletAddress != null && res.result[0] == walletAddress) {
          setIsOwner(1);
        } else if (walletAddress != null) {
          setIsOwner(2);
        }
        var metadata = await getTokenURI(contract, id);
        setNftInfo(metadata);
        setVoyagerLink(
          `https://beta-goerli.voyager.online/contract/${metadata.contract_address}`
        );
        console.log(nftInfo)
    }
    prepare()
  }, [walletAddress]);
  return (
    <div>
      <GlobalStyles />

      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              src={nftInfo.image}
              className="img-fluid img-rounded mb-sm-30"
              alt=""
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              Auctions ends in
              <div className="de_countdown">
                <Clock deadline="December, 30, 2021" />
              </div>
              <h2>{nftInfo.name}</h2>
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>Art
                </div>
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>250
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>18
                </div>
              </div>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <span>
                    <img
                      className="lazy"
                      src={nftInfo.image} 
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </span>
                </div>
                <div className="author_list_info">
                  <span>{nftInfo.contract_address.slice(0,6)}
                  ...
                  {nftInfo.contract_address.slice(-6)}</span>
                </div>
              </div>
              <div className="spacer-40"></div>
              <div className="de_tab">
                <ul className="de_nav">
                  <li id="Mainbtn" className="active">
                    <span onClick={handleBtnClick}>Bids</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={handleBtnClick1}>History</span>
                  </li>
                </ul>

                <div className="de_tab_content">
                  {openMenu && (
                    <div className="tab-1 onStep fadeIn">
                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-2.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid accepted <b>0.005 ETH</b>
                          <span>
                            by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-2.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-3.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.004 ETH</b>
                          <span>
                            by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-4.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.003 ETH</b>
                          <span>
                            by <b>Lori Hart</b> at 6/12/2021, 12:57 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {openMenu1 && (
                    <div className="tab-2 onStep fadeIn">
                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-5.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>Jimmy Wright</b> at 6/14/2021, 6:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-1.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid accepted <b>0.005 ETH</b>
                          <span>
                            by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-2.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.005 ETH</b>
                          <span>
                            by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-3.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.004 ETH</b>
                          <span>
                            by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM
                          </span>
                        </div>
                      </div>

                      <div className="p_list">
                        <div className="p_list_pp">
                          <span>
                            <img
                              className="lazy"
                              src="./img/author/author-4.jpg"
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </span>
                        </div>
                        <div className="p_list_info">
                          Bid <b>0.003 ETH</b>
                          <span>
                            by <b>Lori Hart</b> at 6/12/2021, 12:57 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ItemDetail;
