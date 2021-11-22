import React from "react";
import "./App.css";
import TradingViewWidget from "./Charts/tradingview-widget/TradingviewWidget";
import axios from "axios";

function App() {
  function startBot(e) {
    e.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/bot?action=start`)
      .then(res => {
        console.log('bot start');
      })
  }

  function endBot(e) {
    e.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/bot?action=stop`)
      .then(res => {
        console.log('bot stop');
      })
  }

  return (
    <div>
      <div style={{ height: 850 }}>
        <TradingViewWidget />
      </div>
      <div className="mt-3 d-flex justify-content-end">
        <div style={{ marginRight: 5 }}>
          <button type="button" className="mr-3 btn btn-primary" style={{ marginRight: 7 }} onClick={startBot}>Start</button>
          <button type="button" className="btn btn-dark" onClick={endBot}>End</button>
        </div>      
      </div>
    </div>
  );
}

export default App;
