import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import MyRoutes from "./routes/MyRoutes";
import store from "./store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop />
        <MyRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
