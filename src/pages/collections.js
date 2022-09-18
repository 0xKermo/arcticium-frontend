import { useQuery } from "@apollo/client";
import { createGlobalStyle } from "styled-components";
import CollectionsColumnCollection from "../components/explorerColumnCollecetion";
import SliderMainZero from "../components/SliderMainZero";
import { getCollections } from "../grqphql/query";

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

const Collections = () => {
  const { loading, error, data } = useQuery(getCollections);

  return (
    <div>
      <GlobalStyles />
      <section className="jumbotron no-bg bg-gray">
         <SliderMainZero text={"Top Collections"}/>
      </section>

      <section className="container">
        <div className="row">
          {!loading && (
            <div className="col-lg-12">
              <CollectionsColumnCollection collections={data.collections} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default Collections;
