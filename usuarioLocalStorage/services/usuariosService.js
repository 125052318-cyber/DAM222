// Importamos las funciones genéricas de persistencia desde nuestra capa de almacenamiento.
// Así este archivo no toca window.localStorage directamente.
import { guardarItem, recuperarItem, eliminarItem } from '../storage/localStorage';

// Clave única bajo la cual se guardará el arreglo de usuarios dentro de LocalStorage.
const CLAVE_USUARIOS = '@usuarioLocalStorage:usuarios';

// Datos semilla por si es la primera vez que se abre la app y aún no hay nada guardado.
const USUARIOS_INICIALES = [
  { id: '1', nombre: 'Isay Guerra', edad: 22 },
  { id: '2', nombre: 'Ana López', edad: 19 },
  { id: '3', nombre: 'Carlos Gonzalez', edad: 25 },
  { id: '4', nombre: 'Bjork Guerra', edad: 21 },
  { id: '5', nombre: 'Luisa Martínez', edad: 28 },
];

// Valida que el nombre y la edad cumplan las reglas básicas antes de guardar o actualizar.
export const validarDatosUsuario = ({ nombre, edad }) => {
  const errores = [];

  // Eliminamos espacios en blanco al inicio y final para evitar nombres vacíos con espacios.
  const nombreLimpio = typeof nombre === 'string' ? nombre.trim() : '';

  // Convertimos la edad a número para comprobar que sea un valor numérico válido.
  const edadNumero = Number(edad);

  // Validación del campo nombre.
  if (!nombreLimpio) {
    errores.push('El nombre es obligatorio.');
  } else if (nombreLimpio.length < 2) {
    errores.push('El nombre debe tener al menos 2 caracteres.');
  }

  // Validación del campo edad (no vacío, numérico, entero y dentro de un rango razonable).
  if (edad === '' || edad === null || edad === undefined || Number.isNaN(edadNumero)) {
    errores.push('La edad debe ser un número válido.');
  } else if (!Number.isInteger(edadNumero) || edadNumero < 1 || edadNumero > 120) {
    errores.push('La edad debe ser un número entero entre 1 y 120.');
  }

  // Devolvemos el resultado de la validación junto con los datos ya limpios/normalizados.
  return {
    valido: errores.length === 0,
    errores,
    datosNormalizados: {
      nombre: nombreLimpio,
      edad: edadNumero,
    },
  };
};

// Obtiene la lista completa de usuarios desde LocalStorage de forma asíncrona.
export const obtenerUsuarios = async () => {
  const usuariosGuardados = await recuperarItem(CLAVE_USUARIOS);

  // Si no existe la clave o no es un arreglo válido, inicializamos con USUARIOS_INICIALES.
  if (!Array.isArray(usuariosGuardados)) {
    await guardarItem(CLAVE_USUARIOS, USUARIOS_INICIALES);
    return USUARIOS_INICIALES;
  }

  return usuariosGuardados;
};

// Crea un nuevo usuario tras validar los datos y lo persiste en LocalStorage.
export const crearUsuario = async ({ nombre, edad }) => {
  // 1. Validar datos de entrada.
  const validacion = validarDatosUsuario({ nombre, edad });
  if (!validacion.valido) {
    return { ok: false, errores: validacion.errores };
  }

  // 2. Recuperar usuarios actuales para calcular el siguiente id.
  const usuarios = await obtenerUsuarios();
  const siguienteId =
    usuarios.length > 0
      ? String(Math.max(...usuarios.map((u) => Number(u.id) || 0)) + 1)
      : '1';

  // 3. Armar el nuevo objeto usuario con los datos normalizados.
  const nuevoUsuario = {
    id: siguienteId,
    ...validacion.datosNormalizados,
  };

  // 4. Agregar a la lista y guardar la nueva versión en LocalStorage.
  const nuevaLista = [...usuarios, nuevoUsuario];
  await guardarItem(CLAVE_USUARIOS, nuevaLista);

  return { ok: true, usuario: nuevoUsuario };
};

// Actualiza un usuario existente identificado por su id.
export const actualizarUsuario = async (id, { nombre, edad }) => {
  // Verificamos que se haya recibido un id.
  if (!id) {
    return { ok: false, errores: ['No se encontró el identificador del usuario.'] };
  }

  // Validamos los nuevos valores de nombre y edad.
  const validacion = validarDatosUsuario({ nombre, edad });
  if (!validacion.valido) {
    return { ok: false, errores: validacion.errores };
  }

  // Buscamos el índice del usuario dentro del arreglo actual.
  const usuarios = await obtenerUsuarios();
  const indice = usuarios.findIndex((u) => String(u.id) === String(id));

  if (indice === -1) {
    return { ok: false, errores: ['El usuario a actualizar no existe.'] };
  }

  // Conservamos propiedades previas del usuario y reemplazamos nombre y edad normalizados.
  const usuarioActualizado = {
    ...usuarios[indice],
    ...validacion.datosNormalizados,
  };

  // Generamos un nuevo arreglo inmutable con el registro actualizado y lo guardamos.
  const nuevaLista = usuarios.map((u, idx) => (idx === indice ? usuarioActualizado : u));
  await guardarItem(CLAVE_USUARIOS, nuevaLista);

  return { ok: true, usuario: usuarioActualizado };
};

// Elimina un usuario por su id y actualiza la lista guardada en LocalStorage.
export const eliminarUsuario = async (id) => {
  if (!id) {
    return { ok: false, errores: ['No se encontró el identificador del usuario.'] };
  }

  const usuarios = await obtenerUsuarios();
  const nuevaLista = usuarios.filter((u) => String(u.id) !== String(id));

  // Si la longitud no cambió, significa que no se encontró ningún usuario con ese id.
  if (nuevaLista.length === usuarios.length) {
    return { ok: false, errores: ['El usuario a eliminar no existe.'] };
  }

  await guardarItem(CLAVE_USUARIOS, nuevaLista);
  return { ok: true };
};

// Borra por completo la clave de usuarios en LocalStorage (útil para pruebas o reinicio).
export const limpiarUsuariosStorage = async () => {
  await eliminarItem(CLAVE_USUARIOS);
};