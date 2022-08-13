import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/animated.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/elegant-icons/style.css";
import "../node_modules/et-line/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./assets/style.scss";
import "./assets/style_grey.scss";
import "./web.config";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./menu/header";
import Footer from "./menu/footer";
import { Provider } from "react-redux";
import store from "./store";
import Nfts from "./pages/nfts";
import Collections from "./pages/collections";
import Collection from "./pages/collection";
import ItemDetail from "./pages/itemDetail";
import Profile from "./pages/profile";
import Faucet from "./pages/faucet";
import Mint from "./pages/mint";
import Swap from "./pages/swap";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nfts" element={<Nfts />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collection/:contract" element={<Collection />} />
        <Route path="/asset/:contract/:id" element={<ItemDetail />} />
        <Route path="/asset/:contract/:id/swap" element={<Swap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faucet" element={<Faucet />} />
        <Route path="/mint" element={<Mint />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
