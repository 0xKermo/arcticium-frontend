import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;
const dummyData = [
  {
    deadline: "22-08-222",
    avatar: "./img/author/author-1.jpg",
    preview_image: "./img/items/music-1.jpg",
    price: "1",
    bid: "2",
    max_bid: "1",
    bid_link: "",
    likes: "1",
  },
  {
    deadline: "22-08-222",
    avatar: "./img/author/author-2.jpg",
    preview_image: "./img/items/music-2.jpg",
    price: "1",
    bid: "2",
    max_bid: "1",
    bid_link: "",
    likes: "1",
  },
  {
    deadline: "22-08-222",
    avatar: "./img/author/author-3.jpg",
    preview_image: "./img/items/music-3.jpg",
    price: "1",
    bid: "2",
    max_bid: "1",
    bid_link: "",
    likes: "1",
  },
  {
    deadline: "22-08-222",
    avatar: "./img/author/author-4.jpg",
    preview_image: "./img/items/music-4.jpg",
    price: "1",
    bid: "2",
    max_bid: "1",
    bid_link: "",
    likes: "1",
  },
  {
    deadline: "22-08-222",
    avatar: "./img/author/author-5.jpg",
    preview_image: "./img/items/music-5.jpg",
    price: "1",
    bid: "2",
    max_bid: "1",
    bid_link: "",
    likes: "1",
  },
  {
    deadline: "22-08-222",
    avatar: "./img/author/author-6.jpg",
    preview_image: "./img/items/music-6.jpg",
    price: "1",
    bid: "2",
    max_bid: "1",
    bid_link: "",
    likes: "1",
  },
  {
    deadline: "22-08-222",
    avatar: "./img/author/author-7.jpg",
    preview_image: "./img/items/music-7.jpg",
    price: "1",
    bid: "2",
    max_bid: "1",
    bid_link: "",
    likes: "1",
  },
];
const ColumnMyNfts = () => {
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };
  const loadMore = () => {
    console.log(dummyData);
    let nftState = dummyData;
    let start = nftState.length;
    let end = nftState.length + 4;
    // this.setState({
    //   nfts: [...nftState, ...this.dummyData.slice(start, end)],
    // });
  };
  return (
    <div className="row">
      {dummyData.map((nft, index) => (
        <div
          key={index}
          className="d-item col-lg-2 col-md-6 col-sm-6 col-xs-12 mb-4"
          onClick={() => window.open("asset/0x041e478739dc3c8cb8e530b0e2146c3ec4df0f7efaf804131797d39276fde64c/1", "_self")}
        >
          <div className="nft__item m-0">
            <div className="nft__item_wrap" style={{ height: `${height}px` }}>
              <Outer>
                <span>
                  <img
                    onLoad={onImgLoad}
                    src={nft.preview_image}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </span>
              </Outer>
            </div>
            <div className="nft__item_info">
              <span onClick={() => window.open(nft.bid_link, "_self")}>
                <h4>test name</h4>
              </span>
              <div className="nft__item_price">
                0x123...0231
              </div>
              <div className="nft__item_action">
                <span onClick={() => window.open("0x0557f3d930a209a224e5976202ec66a839779e6bf7c340348e40a62027ab6ee8/16", "_self")}>
                  ...
                </span>
              </div>
              <div className="nft__item_like">
                <span>Unlisted</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {dummyData.length !== dummyData.length && (
        <div className="col-lg-12">
          <div className="spacer-single"></div>
          <span onClick={loadMore} className="btn-main lead m-auto">
            Load More
          </span>
        </div>
      )}
    </div>
  );
};
export default ColumnMyNfts;
