import { existsSync, writeFileSync, mkdirSync} from 'fs'

/**
 * Create a directory
 * @param _dir 
 */
export const createDir = (_dir: string) => {
    if (!existsSync(_dir)) {
        mkdirSync(_dir);
    }
}

/** 
 * Create File 
 * @param _filePath: Ruta del archivo
 * @param buff: stringFile para crear el archivo 
 * @returns true: archivo existe y no se crea; false: archivo no existe y se creo
 */
export const createFile = (_filePath, buff): boolean => {
    if (existsSync(_filePath)) {
        return true//Error('Archivo ya existe.')
    } else {
        writeFileSync(_filePath, buff)
        return false
    }
}
