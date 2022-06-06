import "./App.css";
import { Header } from "./components/Header";
import { FinancialPage } from "./pages/FinancialPage";

function App() {
  return (
    <div className="App" data-testid="app">
      <Header />
      <FinancialPage />
    </div>
  );
}

export default App;
