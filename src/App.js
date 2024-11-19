import React, { Suspense } from "react";
import '../src/index.scss'
// ** Router Import
import Router from "./router/Router";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
