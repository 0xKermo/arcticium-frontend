import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLazyQuery } from "@apollo/client";
import { getCurrencies } from '../query';
import {setCurrencyInfo} from '../../store/slicers/currency'

export const GraphqlCurrency = (_contract,_id) => {
  const dispatch = useDispatch()
  const [getDog, { loading, data }] = useLazyQuery(getCurrencies);
  
  const graphqlCurrency = () => {
    getDog()
    if(!loading && data != null){
    const currencyInfo = data.getCurrencies.map((item,i) => {
        return {
            value:item.currencyAddress,
            label:item.currencyName
        }
    }) 
      dispatch(setCurrencyInfo({currencyInfo}))
    }
      
   
  }
  useEffect(() => {
    graphqlCurrency()
  },[loading])

return {graphqlCurrency}
}