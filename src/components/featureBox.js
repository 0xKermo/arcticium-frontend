import React from "react";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const FeatureBox = () => (
  <div className="row">
    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className="bg-color-2 i-boxed icon_wallet"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">Set up your wallet</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">Connect with your wallet.</p>
          </Reveal>
        </div>
        <i className="wm icon_wallet"></i>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">List your NFT's</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">List your Nft's to swap.</p>
          </Reveal>
        </div>
        <i className="wm icon_cloud-upload_alt"></i>
      </div>
    </div>

    <div className="col-lg-4 col-md-6 mb-3">
      <div className="feature-box f-boxed style-3">
        <Reveal
          className="onStep"
          keyframes={fadeInUp}
          delay={0}
          duration={600}
          triggerOnce
        >
          <i className=" bg-color-2 i-boxed arrow_left-right_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={100}
            duration={600}
            triggerOnce
          >
            <h4 className="">Swap your NFT's</h4>
          </Reveal>
          <Reveal
            className="onStep"
            keyframes={fadeInUp}
            delay={200}
            duration={600}
            triggerOnce
          >
            <p className="">Make an offer a swap to a listed nft or list your nft for a swap</p>
          </Reveal>
        </div>
        <i className="wm arrow_left-right_alt"></i>
      </div>
    </div>
  </div>
);
export default FeatureBox;
