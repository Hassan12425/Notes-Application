import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

describe("App component", () => {
  test('renders login form for the "/" route', async () => {
    render(<App />);

    await waitFor(() => {
      const loginForm = screen.getByTestId("login-form");
      expect(loginForm).toBeInTheDocument();
    });
  });
  test("renders signup form on /signup route", () => {
    render(<App />);
    userEvent.click(screen.getByRole("link", { name: /signup/i }));
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });
});
