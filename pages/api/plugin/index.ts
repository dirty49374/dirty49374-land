
const BASIC_LOGGING: any = {
  requestDidStart(requestContext: any) {
    const query = requestContext.request.query;
    if (query.includes("IntrospectionQuery")) return;

    console.log('QUERY: ', requestContext.request.query.split("\n")[0]);
    console.log('        args:', requestContext.request.variables);
    return {
      didEncounterErrors(requestContext: any) {
        console.log('an error happened in response to query ' + requestContext.request.query);
        console.log(requestContext.errors);
      }
    };
  },

  willSendResponse(requestContext: any) {
    // console.log("response sent", requestContext.response);
  }
};

export const apolloPlugins = process.env.NODE_ENV !== 'production'
  ? [BASIC_LOGGING]
  : [];
