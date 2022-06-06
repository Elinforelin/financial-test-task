import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./store/store";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getAllByTestId("app");
  waitFor(() => expect(linkElement).toBeInTheDocument());
});
