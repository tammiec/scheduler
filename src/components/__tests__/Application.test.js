import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "../Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
