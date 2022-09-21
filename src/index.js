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

import App from "./App";
import Header from "./menu/header";
import Footer from "./menu/footer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new ApolloClient({
  uri: "http://api.arcticium.com:4000/graphql",
  cache: new InMemoryCache(),
});
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
