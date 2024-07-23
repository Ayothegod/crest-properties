import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Footer from "./components/utils/Footer";

export default function App() {
  
  return (
    <Router
      root={(props) => (
        <main class="font-inter">
          <a href="/">Index</a>
          <a href="/about">About</a>
          <Suspense>{props.children}</Suspense>

          <Footer/>
        </main>
      )}
    >
        <FileRoutes />
    </Router>
  );
}
