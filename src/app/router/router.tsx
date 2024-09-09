import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home";
import RootLayoutClient from "../layout/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayoutClient>
        <HomePage />
      </RootLayoutClient>
    ),
  },
]);
