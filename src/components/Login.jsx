import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styles from "../styles/Registration.module.css";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [userLogState, setUserLogState] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [flag, setFlag] = useState(false);
  const [home, setHome] = useState(true);

  const handleClick = (e) => {
    navigate("/register");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let userLog = "",
      pass = "";

    if (!localStorage.getItem("user")) {
      alert("Nombre de Usuario invalido");
    } else if (!localStorage.getItem("Password")) {
      alert("Contraseña invalida");
    } else {
      userLog = localStorage.getItem("user").replace(/"/g, "");
      pass = localStorage.getItem("Password").replace(/"/g, "");
    }

    if (!userLogState || !passwordLog) {
      setFlag(true);
      alert("Por favor completa los campos restantes");
    } else if (passwordLog !== pass || userLogState !== userLog) {
      setFlag(true);
      alert("Por favor revisa los datos ingresados");
    } else {
      setUser(userLog);
      setHome(!home);
      setFlag(false);
    }
  };

  return (
    <div>
      {home ? (
        <form onSubmit={handleLogin} className={styles.form}>
          <h2>Ingresar</h2>
          <div className={styles.formRegister}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Usuario: </label>
              <input
                name="name"
                type="text"
                className={styles.inputRegister}
                placeholder="Ingrese su nombre de usuario"
                onChange={(e) => setUserLogState(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pass">contraseña: </label>
              <input
                name="pass"
                type="password"
                className={styles.inputRegister}
                placeholder="Ingrese su contraseña"
                onChange={(e) => setPasswordLog(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Ingresar
            </button>
            <p>
              Aún no tienes una cuenta?{" "}
              <b onClick={handleClick} className={styles.ingresarBbtn}>
                Crea una
              </b>
            </p>
          </div>
        </form>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </div>
  );
}
