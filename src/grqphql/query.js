import { gql } from "@apollo/client";

export const collections = gql`
  {
    collections {
      collectionAddress
      collectionOwner
    }
  }
`;

export const tokensURI = gql`
  {
    getTokensURI {
      name
      description
      image
      contract_address
      token_id
    }
  }
`;

export const tokenURI = gql`
query GetTokenURI($contract_address: String!, $token_id: String!) {
  getTokenURI(contract_address: $contract_address, token_id: $token_id) {
    name
    description
    image
    contract_address
    token_id
  }
}
`;
