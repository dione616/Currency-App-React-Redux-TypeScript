import React from "react"
import { render } from "react-dom"
/* import Layout from "./components/Layout"; */
import Featured from "./components/Featured/Featured"
import Converter from "./components/Converter/Converter"
import { Provider } from "react-redux"
import "./styles.css"
import store from "./redux/store"
import logo from "./logo.png"

interface Props {}

const App: React.FC<Props> = (props) => {
  return (
    <div className="App">
      <header>
        <div className="logo">
          <img width="50px" src={logo} alt="logo" />
        </div>
        <h1>Currency App</h1>
      </header>

      <main>
        <h2>Currency Rate</h2>

        <Featured />
        <h2>Exchenge</h2>
        <Converter />
      </main>
    </div>
  )
}

export default App

const rootElement = document.getElementById("root")
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
