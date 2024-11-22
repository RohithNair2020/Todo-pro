import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2, staleTime: 5 * 1000 } },
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PrimeReactProvider>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </BrowserRouter>
        </PrimeReactProvider>
    </StrictMode>
);
