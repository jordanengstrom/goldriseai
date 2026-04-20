import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import {
	assertSeo006Hygiene,
	assertUniquePrimaryKeywords,
	seoKeywordMap,
} from "./lib/seo-keyword-map";
import { ENABLE_PAYMENTS_FEATURE } from "./lib/features";

if (import.meta.env.DEV) {
	assertUniquePrimaryKeywords(seoKeywordMap);

	const liveRoutePaths = [
		"/",
		"/services/ai-opportunity-assessment",
		"/services/ai-education",
		"/services/ai-implementation",
		"/values",
		"/contact",
		"/terms",
	];
	if (ENABLE_PAYMENTS_FEATURE) {
		liveRoutePaths.push("/payments");
	}

	assertSeo006Hygiene(liveRoutePaths);
}

createRoot(document.getElementById("root")!).render(<App />);
