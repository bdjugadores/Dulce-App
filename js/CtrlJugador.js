import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraJugadores
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoJugador =
  getFirestore().
    collection("Jugador");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
/** @type {HTMLFormElement} */
const forma = document["forma"];

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoJugador.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Jugador} */
      const data = doc.data();
      forma.nombre.value = data.nombre ||"";
      forma.apellido.value = data.apellido || "";
      forma.edad.value = data.edad || "";
      forma.posicion.value = data.posicion || "";
      forma.fecha.value = data.fecha || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraJugadores();
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma); 
    const nombre = getString(formData, "nombre").trim();
    const apellido = getString(formData, "apellido").trim();
    const edad = getString(formData, "edad").trim();
    const posicion = getString(formData, "posicion").trim();
    const fecha = getString(formData, "fecha").trim();
    /**
     * @type {
        import("./tipos.js").
                Jugador} */
    const modelo = {
      nombre, 
      apellido,
      edad,
      posicion,
      fecha
    };
    await daoJugador.
      doc(id).
      set(modelo);
    muestraJugadores();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoJugador.
        doc(id).
        delete();
      muestraJugadores();
    }
  } catch (e) {
    muestraError(e);
  }
}