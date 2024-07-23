import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Footer from "./components/utils/Footer";
import Header from "./components/utils/Header";

export default function App() {
  
  return (
    <Router
      root={(props) => (
        <main class="font-inter flex flex-col min-h-screen">
          <Header/>

          <div class="flex-1">
          <Suspense>{props.children}</Suspense>
          </div>

          <Footer/>
        </main>
      )}
    >
        <FileRoutes />
    </Router>
  );
}
