import "./App.css";
import React from "react";
import Root from "./navigation/Root";
import { SessionProvider } from "./navigation/SessionProvider";
// import 'bootstrap/dist/css/bootstrap.min.css';

require("dotenv").config();

function App() {
  return (
    <SessionProvider>
      <Root />
    </SessionProvider>
  );
}

export default App;
