import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from "@apollo/client";
import { getCurrencies } from '../query';
import {setCurrencyInfo} from '../../store/slicers/currency'

export const GraphqlCurrency = (_contract,_id) => {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(getCurrencies);
  
  const graphqlCurrency = () => {
    if(!loading){
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