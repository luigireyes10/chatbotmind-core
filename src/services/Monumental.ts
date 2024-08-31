const soap = require('soap')
import { MONUMENTAL_SERVICE_URL } from '../constants/urls'

const url = MONUMENTAL_SERVICE_URL

export type marcaMonumental = {
    CodMarca: string
    DescMarca: string
}

export type modeloMonumental = {
    CodModelo: string
    DescModelo: string
    potencia: any
}

const args = {
    usuario: process.env.MONUMENTAL_USER,
    password: process.env.MONUMENTAL_PASSWORD,
    empresa: process.env.MONUMENTAL_ENTERPRISE,
};

export class Monumental {

    /**
     * @description Consultar metodos del servicio
     * @returns 
     */
    getMethods() {
        try {
            return new Promise((resolve, reject) => {
                soap.createClient(url, function (err, client) {
                    if (err) {
                        console.log(`${url} Innaccesible`);
                        return reject();
                    }
                    const methods = Object.keys(
                        client.describe()["BancaSeguros"]["BancaSegurosSoap12"]
                    );
                    return resolve(methods);
                });
            });
        } catch (e) {
            console.log(`Error en <getMethods>: ${e}`)
        }
    }

    /**
     * @description
     * @returns 
     */
    async getColor() {
        try {
            return new Promise((resolve, reject) => {
                soap.createClient(url, function (err, client) {
                    if (err) {
                        console.log(`${url} Innaccesible`);
                        return reject();
                    }

                    client["getColor"](args, function (err, result) {
                        try {
                            let Data = JSON.stringify(result);
                            return resolve(Data);
                        } catch (err) {
                            return reject();
                        }
                    });
                });
            });
        } catch (e) {
            console.log(`Error en <getColor>: ${e}`)
        }
    }

    /**
     * @description
     * @returns 
     */
    async getMarcas() {
        try {
            return new Promise((resolve, reject) => {
                soap.createClient(url, function (err, client) {
                    if (err) {
                        console.log(`${url} Innaccesible`);
                        return reject();
                    }

                    client["GetMarcas"](args, function (err, result) {
                        try {
                            const { Marca } = result.GetMarcasResult;
                            return resolve(Marca);
                        } catch (err) {
                            return reject();
                        }
                    });
                });
            });
        } catch (e) {
            console.log(`Error en <getMarcas>: ${e}`)
        }
    }

    async getMarcasVM(
        descMarca: string
    ): Promise<marcaMonumental> {
        try {

            const marcaDefault: [marcaMonumental] = [{
                CodMarca: '',
                DescMarca: ''
            }]

            return new Promise((resolve, reject) => {
                soap.createClient(url, function (err, client) {
                    if (err) {
                        console.log(`${url} Innaccesible`);
                        return reject();
                    }

                    client["GetMarcas"](args, async function (err, result) {
                        try {
                            const Marca: [marcaMonumental] = await result.GetMarcasResult.Marca;

                            const _marcaFilter = Marca.filter(m => m.DescMarca === descMarca)
                            if (!_marcaFilter.length) {
                                return resolve(marcaDefault[0]);
                            } else {
                                return resolve(_marcaFilter[0]);
                            }

                        } catch (err) {
                            return reject();
                        }
                    });
                });
            });
        } catch (e) {
            console.log(`Error en <getMarcasVM>: ${e}`)
        }
    }

    /**
     * @description
     * @param codMarca 
     * @returns 
     */
    async getModelos(codMarca) {
        try {
            return new Promise((resolve, reject) => {
                soap.createClient(url, function (err, client) {
                    if (err) {
                        console.log(`${url} Innaccesible`);
                        return reject();
                    }

                    client["GetModelos"](
                        { ...args, codMarca: codMarca },
                        function (err, result) {
                            try {
                                if (result.GetModelosResult) {
                                    const { Modelo } = result.GetModelosResult;
                                    return resolve(Modelo);
                                }
                            } catch (err) {
                                return reject(err);
                            }
                        }
                    );
                });
            });
        } catch (e) {
            console.log(`Error en <getModelos>: ${e}`)
        }
    }

    async getModelosVM(
        codMarca: string,
        codModelo: string
    ): Promise<modeloMonumental> {
        try {
            
            const modeloDefault: [modeloMonumental] = [{
                CodModelo: '',
                DescModelo: '',
                potencia:  null
            }]

            return new Promise((resolve, reject) => {
                soap.createClient(url, function (err, client) {
                    if (err) {
                        console.log(`${url} Innaccesible`);
                        return reject();
                    }

                    client["GetModelos"](
                        { ...args, codMarca: codMarca },
                        function (err, result) {
                            try {
                                if (result.GetModelosResult) {
                                    // console.log(result.GetModelosResult)
                                    const Modelo: [modeloMonumental] = result.GetModelosResult.Modelo;

                                    const _modeloFilter = Modelo.filter(mo => mo.DescModelo === codModelo)

                                    // console.log(_modeloFilter)

                                    if (!_modeloFilter.length) {
                                        return resolve(modeloDefault[0]);
                                    } else {
                                        return resolve(_modeloFilter[0]);
                                        // return resolve(_marcaFilter[0]);
                                    }

                                    
                                }
                            } catch (err) {
                                return reject(err);
                            }
                        }
                    );
                });
            });
        } catch (e) {
            console.log(`Error en <getModelosVM>: ${e}`)
        }
    }

    /**
     * @description
     * @param nombre 
     * @param apellido 
     * @param codMarca 
     * @param codModelo 
     * @param anoVehiculo 
     * @param valorVeh 
     * @param pasajeros 
     * @returns 
     */
    async getCotizacionIndividual(
        nombre,
        apellido,
        codMarca,
        codModelo,
        anoVehiculo,
        valorVeh,
        pasajeros
    ) {
        try {
            return new Promise((resolve, reject) => {
                soap.createClient(url, function (err, client) {
                    if (err) {
                        console.log(`${url} Innaccesible`);
                        return reject();
                    }

                    client["cotizarIndividual"](
                        {
                            ...args,
                            nombre: nombre,
                            apellido: apellido,
                            codigoMarca: codMarca,
                            codigoModelo: codModelo,
                            anoVehiculo: anoVehiculo,
                            valorVeh: valorVeh,
                            usoVeh: "",
                            codPotencia: "",
                            pasajeros: pasajeros,
                        },
                        function (err, result) {
                            try {
                                return resolve(result);
                            } catch (err) {
                                return reject(err);
                            }
                        }
                    );
                });
            });
        } catch (e) {
            console.log(`Error en <getCotizarIndividual>: ${e}`)
        }
    }

    /**
     * @description
     * @param noCotizacion 
     * @returns 
     */
    async getCoberturas(noCotizacion) {
        try {
            return new Promise((resolve, reject) => {
                soap.createClient(url, function (err, client) {
                    if (err) {
                        console.log(`${url} Innaccesible`);
                        return reject();
                    }

                    client["getCoberturas"](
                        { ...args, numCotiz: noCotizacion },
                        function (err, result) {
                            try {
                                return resolve(result);
                            } catch (err) {
                                return reject(err);
                            }
                        }
                    );
                });
            });
        } catch (e) {
            console.log(`Error en <getCoberturas>: ${e}`)
        }
    }
}
