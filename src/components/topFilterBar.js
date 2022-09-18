import React, { useCallback, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { tradeType, status, itemsType } from "./constants/filters";
import { setOpenTrades } from "../store/slicers/openTradesData";

const TopFilterBar = (props) => {
  const dispatch = useDispatch();
  const [openTradeData, setOpenTradeData] = useState(props.data);

  const handeleTradeType = useCallback(
    (option) => {
      const { value } = option;
      if (value) {
        const filteredData = openTradeData.filter(
          (item) => item.tradeType == value
        );
        setOpenTradeData(filteredData);
        dispatch(setOpenTrades(filteredData));
      } else {
        setOpenTradeData(props.data);
        dispatch(setOpenTrades(props.data));
      }
    },
    [dispatch]
  );

  const filterNftTitles = useCallback(
    (event) => {
      const value = event.target.value;
      const filteredData = openTradeData.filter((item) =>
      item.assetInfo.name ?item.assetInfo.name.toLowerCase().includes(value):null
      );
      setOpenTradeData(filteredData);

      dispatch(setOpenTrades(filteredData));
    },
    [dispatch]
  );

  const defaultValue = {
    value: null,
    label: "Select Trade Type",
  };

  const customStyles = {
    option: (base, state) => ({
      ...base,
      background: "#fff",
      color: "#333",
      borderRadius: state.isFocused ? "0" : 0,
      "&:hover": {
        background: "#eee",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    control: (base, state) => ({
      ...base,
      padding: 2,
    }),
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="items_filter">
          <form
            className="row form-dark"
            id="form_quick_search"
            name="form_quick_search"
          >
            <div className="col">
              <input
                className="form-control"
                id="name_1"
                name="name_1"
                placeholder="search item here..."
                type="text"
                onChange={filterNftTitles}
              />
            </div>
          </form>

          <div className="dropdownSelect one">
            <Select
              styles={customStyles}
              menuContainerStyle={{ zIndex: 999 }}
              defaultValue={defaultValue}
              options={[defaultValue, ...tradeType]}
              onChange={handeleTradeType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFilterBar;
