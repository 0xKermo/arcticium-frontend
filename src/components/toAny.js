import { useState } from "react";

const ToAny = ({ index, avatar, banner, username, uniqueId, collectionId }) => {
  const [isActive, setIsActive] = useState(false);
  const unlockClick = () => {
    setIsActive(true);
  };
  const unlockHide = () => {
    setIsActive(false);
  };
  return (
    <div>
      <div className="de_tab_content pt-3">
        <div id="tab_opt_1">
          <h5>Price</h5>
          <input
            type="text"
            name="item_price"
            id="item_price"
            className="form-control"
            placeholder="enter price for one item (ETH)"
          />
        </div>

        <div id="tab_opt_2" className="hide">
          <h5>Minimum bid</h5>
          <input
            type="text"
            name="item_price_bid"
            id="item_price_bid"
            className="form-control"
            placeholder="enter minimum bid"
          />

          <div className="spacer-20"></div>

          <div className="row">
            <div className="col-md-6">
              <h5>Starting date</h5>
              <input
                type="date"
                name="bid_starting_date"
                id="bid_starting_date"
                className="form-control"
                min="1997-01-01"
              />
            </div>
            <div className="col-md-6">
              <h5>Expiration date</h5>
              <input
                type="date"
                name="bid_expiration_date"
                id="bid_expiration_date"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div id="tab_opt_3"></div>
      </div>
      <div className="spacer-20"></div>

      <div className="switch-with-title">
        <h5>
          <i className="fa fa- fa-unlock-alt id-color-2 mr10"></i>
          Unlock once purchased
        </h5>
        <div className="de-switch">
          <input type="checkbox" id="switch-unlock" className="checkbox" />
          {isActive ? (
            <label htmlFor="switch-unlock" onClick={unlockHide}></label>
          ) : (
            <label htmlFor="switch-unlock" onClick={unlockClick}></label>
          )}
        </div>
        <div className="clearfix"></div>
        <p className="p-info pb-3">
          Unlock content after successful transaction.
        </p>

        {isActive ? (
          <div id="unlockCtn" className="hide-content">
            <input
              type="text"
              name="item_unlock"
              id="item_unlock"
              className="form-control"
              placeholder="Access key, code to redeem or link to a file..."
            />
          </div>
        ) : null}
      </div>

      <h5>Title</h5>
      <input
        type="text"
        name="item_title"
        id="item_title"
        className="form-control"
        placeholder="e.g. 'Crypto Funk"
      />

      <div className="spacer-10"></div>

      <h5>Description</h5>
      <textarea
        data-autoresize
        name="item_desc"
        id="item_desc"
        className="form-control"
        placeholder="e.g. 'This is very limited item'"
      ></textarea>

      <div className="spacer-10"></div>

      <h5>Price</h5>
      <input
        type="text"
        name="item_price"
        id="item_price"
        className="form-control"
        placeholder="enter price for one item (ETH)"
      />

      <div className="spacer-10"></div>

      <h5>Royalties</h5>
      <input
        type="text"
        name="item_royalties"
        id="item_royalties"
        className="form-control"
        placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
      />
    </div>
  );
};

export default ToAny;
