import React from "react";

import { StatusBar } from "expo-status-bar";

import { Home } from "./src/pages/Home";

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#21bdd1" />

      <Home />
    </>
  );
}
