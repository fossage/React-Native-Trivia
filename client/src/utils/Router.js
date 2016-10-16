// Creates both our array of routes to use with Navigator's
// route stack as well as a router function which handles
// calling the appropriate route and allows us to use either 
// functions which return the component for the route or
// bare components
export default function Router(routesConfig) {
  let routes = [];

  Object.keys(routesConfig).forEach(key => {
    let route = Object.assign({ name: key }, routesConfig[key].data);
    routes.push(route);
  });
  
  function handleRoute(route, navigator) {
    if(!routesConfig[route.name]) {
      throw new Error(
        `Warning:
        Location ${route.name} did not match any routes`
      );
    }

    if(typeof routesConfig[route.name].view === 'function') {
      return routesConfig[route.name].view(route, navigator)
    } else {
      return routesConfig[route.name].view;
    }
  };

  return {
    router: handleRoute,
    routes: routes
  };
}

// renderScene(route, navigator) {
//     let Component = ROUTES[route.name];
//     return <Component route={route} navigator={navigator} />;
//   },