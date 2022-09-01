// It is used when we have to navigate to a screen from a file which is not in our Root navigator
// We have used it in our App.js file.
import { CommonActions, useNavigationContainerRef } from "@react-navigation/native"
import { isRTLCheck } from "./app/utils/EDConstants";

let _navigator;

function setTopLevelNavigator(navigatorRef) {

  _navigator = navigatorRef;
}



function navigateToSpecificRoute(specifiedRouteName) {
  // CHANGE THE ROOT SCREEN
  if(_navigator != undefined && _navigator != null)
  setTimeout(() => {
    _navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes:[{name: isRTLCheck() ? 'homeRight' : "home" }]
      })
    );
    
    _navigator.dispatch(
      CommonActions.navigate({
        name: specifiedRouteName
      })
    );
  }, 500)
}

function navigate(routeName, action) {
  _navigator.dispatch(
    CommonActions.navigate({
      name:{routeName},
      params: {action}
    }));
}

function getCurrentRoute() {
  return _navigator.getCurrentRoute().name
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  navigateToSpecificRoute,
  getCurrentRoute
};
