import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthFormProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import {ErrorProvider} from "@/context/ErrorProvider.tsx";
import {LoaderProvider} from "@/context/LoaderProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
        <ErrorProvider>
            <LoaderProvider>
                <App />
            </LoaderProvider>
        </ErrorProvider>
    </AuthProvider>
  </BrowserRouter>,
);
