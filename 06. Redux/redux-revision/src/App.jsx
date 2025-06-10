import React from "react";
import Store from "./components/Store";
import Navbar from "./components/Navbar";
import Routing from "./utils/Routing";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routing />
    </div>
  );
};

export default App;
