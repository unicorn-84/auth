import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";
import * as authService from "../firebase";

jest.mock("../firebase", () => {
  const originalModule = jest.requireActual("../firebase");
  return {
    __esModule: true,
    ...originalModule,
    signIn: jest.fn(),
  };
});

let emailInput;
let passwordInput;
let submitBtn;

beforeEach(() => {
  render(<Login />);
  emailInput = screen.getByRole("textbox", { name: /email/i });
  passwordInput = screen.getByLabelText(/password/i);
  submitBtn = screen.getByRole("button", { name: /submit/i });
});

describe("<Login />", () => {
  test("should render correctly", () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test("should send form data to auth service", async () => {
    userEvent.type(emailInput, "johndoe@example.com");
    userEvent.type(passwordInput, "123456");
    userEvent.click(submitBtn);
    await waitFor(() => {
      expect(authService.signIn).toHaveBeenCalledWith(
        "johndoe@example.com",
        "123456"
      );
    });
    expect(authService.signIn).toHaveBeenCalledTimes(1);
  });

  test("should display an error notification when an auth service error occured", async () => {
    authService.signIn.mockImplementation(() =>
      Promise.reject({
        message: "",
      })
    );
    userEvent.type(emailInput, "johndoe@example.com");
    userEvent.type(passwordInput, "123456");
    userEvent.click(submitBtn);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  // email
  describe("email", () => {
    test("should display an error message when the email field is empty", async () => {
      userEvent.click(submitBtn);
      expect(await screen.findAllByRole("alert")).toHaveLength(2);
    });

    test("should dynamically display error message when the email field is empty", async () => {
      fireEvent.focus(emailInput);
      fireEvent.blur(emailInput);
      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });

    test("should display error message when the email value is invalid", async () => {
      userEvent.type(emailInput, "johndoe@gmail");
      userEvent.type(passwordInput, "123456");
      userEvent.click(submitBtn);
      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });

    test("should dynamically display error message when the email value is invalid", async () => {
      userEvent.type(emailInput, "johndoe@gmail");
      fireEvent.blur(emailInput);
      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });
  });

  // password
  describe("password", () => {
    test("should display an error message when the password field is empty", async () => {
      userEvent.click(submitBtn);
      expect(await screen.findAllByRole("alert")).toHaveLength(2);
    });

    test("should dynamically display an error message when the password field is empty", async () => {
      userEvent.type(emailInput, "johndoe@example.com");
      fireEvent.focus(passwordInput);
      fireEvent.blur(passwordInput);
      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });

    test("should display an error message when the password value is too short", async () => {
      userEvent.type(emailInput, "johndoe@example.com");
      userEvent.type(passwordInput, "12345");
      userEvent.click(submitBtn);
      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });

    test("should dynamically display an error message when the password value is too short", async () => {
      userEvent.type(emailInput, "johndoe@example.com");
      userEvent.type(passwordInput, "12345");
      fireEvent.blur(passwordInput);
      expect(await screen.findAllByRole("alert")).toHaveLength(1);
    });
  });
});
