import { initializeCommonUI } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeCommonUI();

  const form = document.querySelector("#feedback-form");
  const timestampInput = document.querySelector("#form-timestamp");

  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }
});
