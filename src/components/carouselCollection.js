import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./constants";
import CustomSlide from "./customSlide";
import { dummyData } from "./constants/dummy";
import { useQuery } from "@apollo/client";
import { getCollections } from "../grqphql/query";
import { useEffect, useState } from "react";

const CarouselCollection = () => {
  const { loading,error,data} = useQuery(getCollections)
  const [collections,setCollections] = useState([])
  useEffect(() => {
     if(!loading){
      setCollections(data.collections)
     }
  
  }, [loading])
  
  return (
    <div className="nft">
      <Slider {...settings}>
        {!loading &&
          collections.map((item, index) => (
            <CustomSlide
              key={index}
              index={index + 1}
              avatar={item.profileImgPath}
              banner={item.bannerPath}
              username={item.collectionName}
              uniqueId={item.unique_id}
              collectionId={item.collectionAddress}
            />
          ))}
      </Slider>
    </div>
  );
};

export default CarouselCollection;
