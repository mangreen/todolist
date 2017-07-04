export default  function  callTraceMiddleware  ({dispatch,getState}) {
     return next => action => {
        console.trace();
        return next(action);
    }
}