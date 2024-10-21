import { useState, useEffect } from "react";
import { auth } from "@/firebaseConnection";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Layout from "@/layout/layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login bem-sucedido!");
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
      <div>
        <h1>{isLoginMode ? "Login" : "Cadastro"}</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!user ? (
          <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isLoginMode ? "Login" : "Cadastrar"}</button>
          </form>
        ) : (
          <div>
            <p>Bem-vindo, {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        {!user && (
          <button onClick={handleGoogleLogin}>Login com Google</button>
        )}
        <button onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? "Criar uma conta" : "Já tenho uma conta"}
        </button>
      </div>
    </Layout>
  );
};

export default Login;
