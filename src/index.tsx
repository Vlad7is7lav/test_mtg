import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/globals.scss"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import store from "./store/index"
import i18next from "i18next"
import { I18nextProvider } from "react-i18next"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
          <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
