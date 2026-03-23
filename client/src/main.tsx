import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { assertUniquePrimaryKeywords, seoKeywordMap } from "./lib/seo-keyword-map";

if (import.meta.env.DEV) {
	assertUniquePrimaryKeywords(seoKeywordMap);
}

createRoot(document.getElementById("root")!).render(<App />);
