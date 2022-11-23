import './App.css';
import Navbar from './components/Navbar';
import React, { useContext, useEffect } from "react";
import Web3Context from './context/Web3Context';
import Home from './components/Home';

function App() {

  const context = useContext(Web3Context);
  console.log("context ==> ", context)

  useEffect(() => {
    context.onConnect();
  }, [])

  return (
    <>
        <Navbar state={context} />
        <Home state={context} />
    </>
  );
}

export default App;
