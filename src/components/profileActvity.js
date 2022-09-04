import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { getUserActivity } from "../grqphql/query";
import { walletAddressSlice } from "../utils/walletAddressSlice";

const Activity = function (props) {
  const [activities, setActivities] = useState();
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(getUserActivity, {
    variables: {
      to: props.wallet,
    },
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <ul className="activity-list">
            {!loading &&
              data.activities.map((item, index) => (
                
                <li className={item.activityType == 'Mint' ?"act_follow": "act_sale"} key={index}>
                  <img
                    className="lazy"
                    src={item.assetImage.image}
                    alt=""
                  />
                  <div className="act_list_text row">
                    {item.activityType == 'Mint'?
                    <>
                    <span className="color">Minted By </span>
                    <span className="act_list_date">{walletAddressSlice(item.to,5,5)}</span> 
                    </>
                  :
                  <>
                    <span className="color">Transferred to </span>
                    <span className="act_list_date">{walletAddressSlice(item.to,5,5)}</span>              
                  </>
                  }
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Activity;
