import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Navigator from "./components/navigator/Navigator";
import MyRoutes from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navigator />
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
