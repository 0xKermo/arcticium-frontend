import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useOnclickOutside from "react-cool-onclickoutside";
import { ConnectWallet } from "../hooks/connectWallet";
import $ from "jquery";

setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);

const Header = function ({ className }) {
  const { walletAddress } = useSelector((state) => state.wallet);
  const { userIsWl } = useSelector((state) => state.userIsWl);

  const { connectWallet, disconnectWallet, silentConnectWallet } =
    ConnectWallet();
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const ref = useOnclickOutside(() => {
    closeMenu();
  });

  const [showmenu, btn_icon] = useState(false);
  const [showpop, btn_icon_pop] = useState(false);

  const closePop = () => {
    btn_icon_pop(false);
  };

  const refpop = useOnclickOutside(() => {
    closePop();
  });

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
        $("#myHeader").addClass("sticky");
        $("#myHeader").addClass("show");
      } else {
        $("#myHeader").removeClass("sticky");
        $("#myHeader").removeClass("show");
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    silentConnectWallet();
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  return (
    <header className={`navbar  ${className}`} id="myHeader">
      <div className="container">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/">
                <span className="logo-font">arcswap</span>
                {/* <img
                  src="/img/ArcticiumLogo01.png"
                  className="img-fluid d-block"
                  alt="#"
                />
                <img
                  src="/img/ArcticiumLogo01png"
                  className="img-fluid d-3"
                  alt="#"
                />
                <img
                  src="/img/ArcticiumLogo01.png"
                  className="img-fluid d-4"
                  alt="#"
                />
                <img
                  src="/img/ArcticiumLogo01.png"
                  className="img-fluid d-none"
                  alt="#"
                /> */}
              </NavLink>
            </div>
          </div>

          {/* <div className="search">
            <input
              id="quick_search"
              className="xs-hide"
              name="quick_search"
              placeholder="search item here..."
              type="text"
            />
          </div> */}

          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                      Home
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <div ref={ref}>
                      <div
                        className="dropdown-custom dropdown-toggle btn"
                        onClick={handleBtnClick}
                      >
                        Explore
                      </div>
                      {openMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink
                              to="/collections"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Collections
                            </NavLink>
                            <NavLink
                              to="/nfts"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Nfts
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/mint">
                      Mint
                      <span className="lines"></span>
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/faucet">
                      Faucets
                      <span className="lines"></span>
                    </NavLink>
                  </div>
                </div>
              )}
            </Breakpoint>

            <Breakpoint xl>
              <div className="menu">
                <div className="navbar-item">
                  <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                    Home
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <div ref={ref}>
                    <div
                      className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick}
                      onMouseLeave={closeMenu}
                    >
                      Explore
                      <span className="lines"></span>
                      {openMenu && (
                        <div className="item-dropdown">
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink
                              to="/collections"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Collections
                            </NavLink>
                            <NavLink
                              to="/nfts"
                              onClick={() => btn_icon(!showmenu)}
                            >
                              Nfts
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="navbar-item">
                  <NavLink to="/mint">
                    Mint
                    <span className="lines"></span>
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/faucet">
                    Faucets
                    <span className="lines"></span>
                  </NavLink>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className="mainside">
            <div className="connect-wal">
              {walletAddress != null ? (
                <div className="active">
                  <div
                    id="de-click-menu-profile"
                    className="de-menu-profile"
                    onClick={() => btn_icon_pop(!showpop)}
                    ref={refpop}
                  >
                    <img
                      src="../../img/author_single/author_thumbnail.jpg"
                      alt=""
                    />
                    {showpop && (
                      <div className="popshow">
                        <div className="d-name">
                          <h3>Monica Lucas</h3>
                        </div>
                        <div className="d-line"></div>
                        <div className="d-balance">
                          <h4>Balance</h4>
                          12.858 ETH
                        </div>
                        <div className="d-wallet">
                          <h4>My Wallet</h4>
                          <span id="wallet" className="d-wallet-address">
                            {walletAddress.slice(0, 6)}
                            ...
                            {walletAddress.slice(-7)}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </div>
                        <div className="d-line"></div>
                        <ul className="de-submenu-profile">
                          <li>
                            <span
                              onClick={() =>
                                window.open(`/${walletAddress}`, "_self")
                              }
                            >
                              <i className="fa fa-user"></i>My Profile
                            </span>
                          </li>
                          <li onClick={disconnectWallet}>
                            <span>
                              <i className="fa fa-sign-out"></i>
                              Disconnect
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="connect-wal">
                  <span
                    onClick={connectWallet}
                    className="non-active btn-connect"
                  >
                    Connect Wallet
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header>
  );
};
export default Header;
