import ReactDOM from "react-dom/client";

import "./index.css";
import CategoryComponent from "./localComponents/category/categoryComponent";

const App = () => <CategoryComponent />;

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
