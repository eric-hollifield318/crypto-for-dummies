import React from "react";
import { AdvancedChart } from "react-tradingview-embed";

export default function TradingViewWidget() {
  React.useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
  }, []);
  return (
    <div className="tradingview-widget-container">
      <AdvancedChart widgetProps={{ theme: "dark", studies: ['MACD@tv-basicstudies'], height: 850 }} />
    </div>
  );
}
