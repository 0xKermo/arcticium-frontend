import { useQuery } from "@apollo/client";

function GraphqlService(query) {
  const { data } = useQuery(query);
  const test = () => {

    if (data) return data;
  }
return {
  test
}
}

export default GraphqlService;
