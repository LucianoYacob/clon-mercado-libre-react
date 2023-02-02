import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import styles from "../src/styles/App.module.css";
import { HomePage } from "./pages/HomePage";
import Footer from "./components/Footer";
import DropDownFooter from "./components/DropDownFooter";
import SearchPage from "./pages/SearchPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import { useEffect, useState } from "react";
import SimpleHeader from "./components/SimpleHeader";
import ProductDetails from "./pages/ProductDetails";

export function App() {
  const [userName, setUserName] = useState("");
  const [inAccesPage, setInAccesPage] = useState(false);

  return (
    <Router>
        <header className={styles.header}>
          {inAccesPage ? <SimpleHeader /> : <Header user={userName} setUser={setUserName}/>}
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/products/:productId" element={ <ProductDetails /> } />
            <Route path="/register" element={<LoginRegisterPage setAccess={setInAccesPage}/>} />
            <Route path="/login" element={<LoginRegisterPage setUser={setUserName} setAccess={setInAccesPage} />} />
            <Route path="/products" element={<SearchPage />} />
            <Route path="/" element={<HomePage setAccess={setInAccesPage} />} />
          </Routes>
        </main>
        {inAccesPage || <DropDownFooter />}
        <footer className={styles.footer}>
          {inAccesPage || <Footer />}
        </footer>
    </Router>
  );
}
