const getStorage = () => {
    if (typeof window !== 'undefined' && window.localStorage){
        return window.localStorage
    }
    throw new Error('LocalStorage no dispone en este entorno web')
};

export const guardarItem = async (clave , valor) => {
    const storage = getStorage();
    const textoJSON = JSON.stringify(valor);
    storage.setItem(clave , textoJSON);
};

export const recuperarItem = async (clave) => {
    const storage = getStorage();
    const valorGuardado = storage.getItem(clave);

    if (valorGuardado === null){
        return null;
    }
    
    try{
        return JSON.parse(valorGuardado);
    }catch(error){
        console.error(`Error al parsear la clave desde LocalStorage` , error);
        return null;
    }
};

export const eliminarItem = async (clave) => {
    const storage = getStorage();
    storage.removeItem(clave);
};