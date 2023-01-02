import { NhostClient } from "@nhost/nhost-js";
import { graphqlWS } from "@pankod/refine-nhost";

const API_URL = "https://yttmwgrgumcexfvlofxb.nhost.run";

const WS_URL = "https://yttmwgrgumcexfvlofxb.nhost.run";

export const nhost = new NhostClient({
  backendUrl: API_URL,
});

// export const gqlWebSocketClient = graphqlWS.createClient({
//   url: WS_URL,
//   connectionParams: () => {
//     const token = nhost.auth.getJWTToken();
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   },
// });
