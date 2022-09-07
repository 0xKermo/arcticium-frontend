import { createGlobalStyle } from "styled-components";

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

const EmptyPage = () => {
  return (
    <div>
      <GlobalStyles />
      <section id="profile_banner" className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb"></div>
      </section>
    </div>
  );
};
export default EmptyPage;
