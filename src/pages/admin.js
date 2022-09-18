import React from "react";
import { createGlobalStyle } from "styled-components";
import { ToastPromise } from "../components/toast";
import { Provider } from "starknet";
import EmptyPage from "../components/emptypage";
import { AdminExchangeOperation } from "../hooks/adminOperation";

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
    .item-dropdown .dropdown a{
      color: #000 !important;
    }
  }
`;

const Admin = () => {

  const { addCurrency,getSwapTrade,getTradeBid,getTradeCount,getTradeBidCount } = AdminExchangeOperation();

  const addCurrencyFunc = async () => {
    const currencyAddress = document.getElementById("currencyAddress").value
    const mintErc20Promise = addCurrency(currencyAddress);
    const provider = new Provider();
    const tx = provider.waitForTransaction(mintErc20Promise.transaction_hash);
    const mintLoadingText = "Transaction pending...";
    const voyagerLink = `https://beta-goerli.voyager.online/tx/${mintErc20Promise.transaction_hash}`;
    const mintSuccessText = `Minted successfully Test arcEth token : <a src=${voyagerLink}>Click and see on Voyager</a>`;
    ToastPromise(tx, mintLoadingText, mintSuccessText);
  };

  const getSwapTradeFunc = () => {
    const tradeId = document.getElementById("tradeId").value

    getSwapTrade(tradeId)
  }

  const getSwapBidFunc = () => {
    const tradeId = document.getElementById("tradeId").value
    const bidId = document.getElementById("bidId").value
    getTradeBid(tradeId,bidId)
  }

  const getSwapCountFunc = () => {
    getTradeCount()
  }

  const getSwapBidCountFunc = () => {
    const tradeId = document.getElementById("tradeId").value
    getTradeBidCount(tradeId)
  }
  return (
    <div>
      <GlobalStyles />

      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <h5>Currency Address</h5>
                <input type="text" id="currencyAddress" className="form-control" />
                <h5>Trade Id</h5>
                <input type="text" id="tradeId" className="form-control" />
                <h5>Bid Id</h5>
                <input type="text" id="bidId" className="form-control" />
              </div>
              <div className="col-6">
                <button className="btn-main lead" onClick={addCurrencyFunc}>add currency</button>
                <button className="btn-main lead" onClick={getSwapTradeFunc}>Get Swap Trade</button>
                <button className="btn-main lead" onClick={getSwapBidFunc}>Get Trade Bid</button>
                <button className="btn-main lead" onClick={getSwapCountFunc}>Get Trade Count</button>
                <button className="btn-main lead" onClick={getSwapBidCountFunc}>Get Trade Bid Count</button>


              </div>
            </div>
          </div>
        </div>
      </section>
      <EmptyPage />
    </div>
  );
};
export default Admin;
