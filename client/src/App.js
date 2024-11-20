// App.js

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import makeStore from "./redux/store";
// import LoadingBar from "react-top-loading-bar";
import PageUser from "./User/PageUser";
import PageDashboard from "./Dashboard/PageDashboard";
import ProductState from "./context/productContext/ProductState";

// const loadingBarColor = "#3b82f6";

function App() {
  // const [progress, setProgress] = useState(10);

  return (
    <React.Fragment>
      <Provider store={makeStore()}>
        <BrowserRouter>
          <ProductState>
            <PageUser />
            <PageDashboard />
          </ProductState>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
