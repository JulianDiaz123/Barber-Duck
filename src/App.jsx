import { Switch, Route } from "wouter";
import HomePage from "./Pages/HomePage";
import NosotrosPage from "./Pages/NosotrosPage";
import TiendaPage from "./Pages/TiendaPage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ProductInfoPage from "./Pages/ProductInfoPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/nosotros" component={NosotrosPage} />
          <Route path="/tienda" component={TiendaPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path={`/producto/:id`} component={ProductInfoPage} />
        </Switch>
      </QueryClientProvider>
    </>
  );
}

export default App;
