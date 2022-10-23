import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./context/AuthContextProvider";
import BlogProvider from "./context/BlogContextProvider";
import AppRouter from "./router/AppRouter";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BlogProvider>
          <AppRouter />
          <ToastContainer />
        </BlogProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
