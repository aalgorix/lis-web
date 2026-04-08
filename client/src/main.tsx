import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { enableUiOnlyMockApi } from "./lib/mock-api";

if (import.meta.env.VITE_UI_ONLY === "true") {
	enableUiOnlyMockApi();
}

createRoot(document.getElementById("root")!).render(<App />);
