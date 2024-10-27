import { useState, useEffect } from "react";
import { auth } from "@/firebaseConnection";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Layout from "@/layout/layout";
import styles from "@/styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login bem-sucedido!");

      if (email === "adm@sorveteria.com" && password === "Ruan123") {
        setIsAdmin(true);
        console.log("Usuário é um administrador!");
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Cadastro bem-sucedido!");
      setIsLoginMode(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      await signInWithPopup(auth, provider);
      console.log("Login com Google bem-sucedido!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logout bem-sucedido!");
      setIsAdmin(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>{isLoginMode ? "Login" : "Cadastro"}</h1>
        {error && <p className={styles.error}>{error}</p>}

        {!user ? (
          <form
            className={styles.form}
            onSubmit={isLoginMode ? handleLogin : handleRegister}
          >
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className={styles.button} type="submit">
              {isLoginMode ? "Login" : "Cadastrar"}
            </button>
          </form>
        ) : (
          <div>
            <p>Bem-vindo, {user.email}</p>
            <button className={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
        {!user && (
          <button className={styles.googleButton} onClick={handleGoogleLogin}>
            Login com Google
          </button>
        )}
        <button
          className={styles.toggle}
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? "Criar uma conta" : "Já tenho uma conta"}
        </button>
      </div>
    </Layout>
  );
};

export default Login;
