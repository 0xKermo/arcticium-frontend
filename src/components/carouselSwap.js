import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./clock";
import { carouselNew } from "./constants";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
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
const CarouselNewRedux = () => {
  const [height, setHeight] = useState(0);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      setHeight(img.offsetHeight);
    }
  };

  return (
    <div className="nft">
      <Slider {...carouselNew}>
        {dummyData &&
          dummyData.length &&
          dummyData.map((nft, index) => (
            <div className="itm" index={index + 1} key={index}>
              <div className="d-item">
                <div className="nft__item">
                  {nft.deadline && (
                    <div className="de_countdown">
                      <Clock deadline={nft.deadline} />
                    </div>
                  )}
                  <div className="author_list_pp">
                    <span onClick={() => window.open("/home1", "_self")}>
                      {nft.avatar && (
                        <img className="lazy" src={nft.avatar} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                    </span>
                  </div>
                  <div
                    className="nft__item_wrap"
                    style={{ height: `${height}px` }}
                  >
                    <Outer>
                      <span>
                        <img
                          src={nft.preview_image}
                          className="lazy nft__item_preview"
                          onLoad={onImgLoad}
                          alt=""
                        />
                      </span>
                    </Outer>
                    <div className="swap-icon">
                      <i className="fa fa-exchange"></i>
                    </div>
                    <Outer>
                      <span>
                        <img
                          src={nft.preview_image}
                          className="lazy nft__item_preview"
                          onLoad={onImgLoad}
                          alt=""
                        />
                      </span>
                    </Outer>
                  </div>
                  <div className="nft__item_info">
                    <span onClick={() => window.open("/#", "_self")}>
                      <h4>{nft.title}</h4>
                    </span>
                    <div className="nft__item_price">
                      {nft.price} ETH
                      <span>
                        {nft.bid}/{nft.max_bid}
                      </span>
                    </div>
                    <div className="nft__item_action">
                      <span onClick={() => window.open(nft.bid_link, "_self")}>
                        Place a bid
                      </span>
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default CarouselNewRedux;
