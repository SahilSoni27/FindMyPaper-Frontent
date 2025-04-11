import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-z4zttcrrdnew1nae.us.auth0.com"
    clientId="KTKXUQ07lmio4QKedF9jp0GVEvk6ByDT"
    authorizationParams={{
      redirect_uri: window.location.origin,
      // redirect_uri: "http://localhost:5173",
    }}
    // authorizationParams={{
    //   redirect_uri: "http://localhost:5173", // Must match exactly with Auth0 settings
    // }}
  >
    <App />
  </Auth0Provider>
);
