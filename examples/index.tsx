import * as React from "react";
import * as ReactDOM from "react-dom";

import PaymentButton from "./payment-button";

const App = () =>
    <PaymentButton
        style={{
            padding: "1rem",
            backgroundColor: "MediumSlateBlue",
            color: "white",
            fontSize: "10vh",
        }}
    />;

ReactDOM.render(<App />, document.getElementById("app"));