import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { persistor } from "./app/store.js";
import { PersistGate } from "redux-persist/integration/react";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster
          position="bottom-right"
          expand={true}
          duration={5000}
          richColors
          closeButton
        />
      </PersistGate>
    </Provider>
  </StrictMode>
);
