import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useQuery } from "@apollo/client";
import { getCollections } from '../query';
import {setCollections,setCollectionLoading,setCollectionError} from '../../store/slicers/collections'

export const GraphqlCollections = (_contract,_id) => {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(getCollections);
  
  const graphqlCollections = () => {
    if(!loading){
        const _collections = data.collections.map((item,i) => {
            const collectionSelect = {
                value: item.collectionAddress,
                label: item.collectionName
            }
            return collectionSelect
        })
        console.log(_collections)
      dispatch(setCollections(_collections))
      dispatch(setCollectionLoading(loading))
    }
      
      dispatch(setCollectionError(error))
   
  }
  useEffect(() => {
    graphqlCollections()
    console.log(data)
  },[setCollectionLoading])

return {graphqlCollections}
}