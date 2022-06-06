import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { Header } from ".";
import { store } from "../../store/store";

test("test headerElem", () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  const headerElem = screen.getAllByTestId("header");
  waitFor(() => expect(headerElem).toBeInTheDocument());
});
