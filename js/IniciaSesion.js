import { getAuth } from "../lib/fabrica.js";
import { muestraError } from "../lib/util.js";
import { iniciaSesionFacebook, iniciaSesión } from "./seguridad.js";

/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLImageElement} */
const avatar = document.
    querySelector("#avatar");

const botonIniciarFacebook = document.querySelector('#iniciarFacebook');

botonIniciarFacebook.addEventListener('click', async (e) => {
    try {
        await iniciaSesionFacebook()
        location.href = "index.html";
        getAuth().onAuthStateChanged(
            muestraSesión, muestraError);
    } catch (error) {
        muestraError(error);
    }
});


const botonIniciarGoogle = document.querySelector('#iniciarGoogle');

botonIniciarGoogle.addEventListener('click', async (e) => {
    try {
        await iniciaSesión()
        getAuth().onAuthStateChanged(
            muestraSesión, muestraError);
        location.href = "index.html";
    } catch (error) {
        muestraError(error);
    }
});

async function
    muestraSesión(usuario) {
    if (usuario && usuario.email) {
        // Usuario aceptado.
        forma.email.value =
            usuario.email || "";
        forma.nombre.value =
            usuario.displayName || "";
        avatar.src =
            usuario.photoURL || "";
        forma.terminarSesión.
            addEventListener(
                "click", terminaSesión);
    } 
}

