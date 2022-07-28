import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from "./constants";
import CustomSlide from "./customSlide";
import { dummyData } from "./constants/dummy";
const CarouselCollection = () => {

  const dispatch = useDispatch();

  return (
      <div className='nft'>
        <Slider {...settings}>
          { dummyData && dummyData.map((item, index) => (
            <CustomSlide
              key={index}
              index={index + 1}
              avatar={item.avatar}
              banner={item.preview_image}
              username={item.name}
              uniqueId={item.unique_id}
              collectionId={item.id}
            />
          ))}
        </Slider>
      </div>
  );
}

export default CarouselCollection;
