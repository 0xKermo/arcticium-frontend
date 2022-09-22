import "./App.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
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
import Admin from "./pages/admin";

const App = () => {
  const { walletAddress } = useSelector((state) => state.wallet);

  const [userIsWl, setUserIsWl] = useState(false);
  useEffect(() => {
    if (walletAddress) {
      const res = checkWalletIsWl(walletAddress);
      console.log("res", res);
      setUserIsWl(res);
    }
  }, [walletAddress]);

  if (userIsWl && walletAddress) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nfts" element={<Nfts />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collection">
          <Route path=":contract" element={<Collection />} />
        </Route>
        <Route path="/asset">
          <Route path=":contract/:id" element={<ItemDetail />} />
        </Route>
        <Route path="/asset/:contract/:id/swap" element={<Swap />} />
        <Route path="/:wallet" element={<Profile />} />
        <Route path="/faucet" element={<Faucet />} />
        <Route path="/mint" element={<Mint />} />
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );
  }
};

export default App;
