import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useQuery } from "@apollo/client";
import { tokenURI,tokensURI } from '../query';
import {setMetadata,setMetadataLoading,setMetadataError} from '../../store/slicers/metadata'

export const GraphqlMetadata = (_contract,_id) => {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(tokenURI, {
    variables: {
      contract_address: _contract,
      token_id: _id,
    },
  });
  
  const graphqlMetadata = () => {
    if(!loading){
      dispatch(setMetadata(data.getTokenURI))
      dispatch(setMetadataLoading(loading))
    }
      
      dispatch(setMetadataError(error))
   
  }
  useEffect(() => {
    graphqlMetadata()
  },[loading])

return {graphqlMetadata}
}