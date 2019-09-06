const fetchMiddleware = store => next => action => {
  next(action);
  let options;
  if (action.meta && action.meta.endpoint) {
    let headers = {
      "Content-Type": "application/json"
    };

    let endpoint = action.meta.endpoint;
    options = {
      method: action.meta.method ? action.meta.method.toLowerCase() : "get",
      headers: headers,
    };
    fetch(endpoint, options)
      .then(function(response) {
        if (response.status >= 402 && response.status < 600) {
          let ex = new Error("Bad response from server");
          ex.response = response;
          throw ex;
        }
        return response.json();
      })
      .then(function(json) {
        if (action.meta.success) {
          const successResult = action.meta.success(json, action.payload);
          // Check to see if the result has a type attribute, if it does then
          // assume its a Redux action and dispatch it.
          if (successResult && successResult.type) {
            // This is quite heavy handed, but `next` refers to an
            // un-middleware'd `dispatch` which means that if the
            // successResult needs to invoke another request it won't go through
            // this fetchMiddleware. As such we force if through the middle ware
            fetchMiddleware(store)(next)(successResult);
          }
        }
      })
     .then(function(ex) {
        if (action.meta.finally) {
          const finalResult = action.meta.finally(action.payload);
          // Check to see if the result has a type attribute, if it does then
          // assume its a Redux action and dispatch it.
          if (finalResult && finalResult.type) {
            // This is quite heavy handed, but `next` refers to an
            // un-middleware'd `dispatch` which means that if the
            // successResult needs to invoke another request it won't go through
            // this fetchMiddleware. As such we force if through the middle ware
            fetchMiddleware(store)(next)(finalResult);
          }
        }
        if (ex) {
          throw ex;
        }
      });
  }
};

export { fetchMiddleware };
