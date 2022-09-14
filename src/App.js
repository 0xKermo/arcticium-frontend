import "./App.css";
import { useSelector } from "react-redux";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Nfts from "./pages/nfts";
import Collections from "./pages/collections";
import Collection from "./pages/collection";
import ItemDetail from "./pages/itemDetail";
import Swap from "./pages/swap";
import Profile from "./pages/profile";
import Faucet from "./pages/faucet";
import Mint from "./pages/mint";
import { useEffect, useState } from "react";
import { checkWalletIsWl } from "./utils/merkleTree";

const App = () => {
  const { walletAddress } = useSelector((state) => state.wallet);

  const [userIsWl, setUserIsWl] = useState(false);
  useEffect(() => {
    if (walletAddress) {
      const res = checkWalletIsWl(walletAddress);
      setUserIsWl(res);
    }
  }, [walletAddress]);

  if (userIsWl) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nfts" element={<Nfts />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collection/:contract" element={<Collection />} />
        <Route path="/asset/:contract/:id" element={<ItemDetail />} />
        <Route path="/asset/:contract/:id/swap" element={<Swap />} />
        <Route path="/:wallet" element={<Profile />} />
        <Route path="/faucet" element={<Faucet />} />
        <Route path="/mint" element={<Mint />} />
      </Routes>
    );
  } else {
    return(
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    )
  }
};

export default App;
