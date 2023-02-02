import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "../styles/Registration.module.css";
import Login from "./Login";

export default function Registration() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !surname || !email || !password) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("user", JSON.stringify(name));
      localStorage.setItem("Password", JSON.stringify(password));

      setLogin(!login);
    }
  };

  const handleClick = (e) => {
    setLogin(!login);
  };

  useEffect(() => {
    flag && alert("Por favor, revisa los datos ingresados");
  }, [flag]);

  return (
    <div>
      {login ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>Registrarse</h1>
          <div className={styles.formRegister}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre:</label>
              <input
                name="name"
                type="text"
                className={styles.inputRegister}
                placeholder="Ingrese su nombre"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="surname">Apellido:</label>
              <input
                name="surname"
                type="text"
                className={styles.inputRegister}
                placeholder="Ingrese su apellido"
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="mail">Correo:</label>
              <input
                name="mail"
                type="email"
                className={styles.inputRegister}
                placeholder="Ingrese su correo electronico"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pass">contraseña:</label>
              <input
                name="pass"
                type="password"
                className={styles.inputRegister}
                placeholder="Ingrese su contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.btn}>
              Registrarse
            </button>

            <p>Ya tienes una cuenta? <b onClick={handleClick} className={styles.ingresarBbtn}>ingresar...</b></p>

          </div>
        </form>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </div>
  );
}
