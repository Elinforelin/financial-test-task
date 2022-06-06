import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { FinancialPage } from ".";

test("test financialpage", () => {
  render(
    <Provider store={store}>
      <FinancialPage />
    </Provider>
  );
  const financialPageElem = screen.getAllByTestId("financial-page");
  waitFor(() => expect(financialPageElem).toBeInTheDocument());
});
