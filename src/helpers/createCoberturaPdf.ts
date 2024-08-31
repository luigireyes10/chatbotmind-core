const path = require('path')
var fs = require("fs");

var fonts = {
    Roboto: {
        normal: path.resolve("src/fonts/Roboto-Regular.ttf"),
        bold: path.resolve("src/fonts/Roboto-Medium.ttf"),
        italics: path.resolve("src/fonts/Roboto-Italic.ttf"),
        bolditalics: path.resolve("src/fonts/Roboto-MediumItalic.ttf"),
    },
};

var PdfPrinter = require("pdfmake");
var printer = new PdfPrinter(fonts);

import { Monumental } from "../services/Monumental";
import { paramsPdfMonumental } from "../typeDef/coberturaMonumentalInput";

const monumental = new Monumental()

async function marcasCapture() {
    return await monumental.getMarcas().then((Data: any) => {
        return Data.map((m) => {
            return m;
        });
    });
}

async function modelosCapture(noMarca) {
    const modelos = [];
    const marcas = await marcasCapture();
    if (noMarca) {

        await monumental
            .getModelos(marcas[noMarca].CodMarca)
            .then((Data: any) => {
                Data.map((x) => {
                    const o = {
                        DescMarca: marcas[noMarca].DescMarca,
                        CodMarca: marcas[noMarca].CodMarca,
                    };
                    const r = Object.assign(o, x);
                    modelos.push(r);
                });
            });
    }
    return modelos;
}

const cotizar = async (
    nombre: string,
    apellido: string,
    codMarca: string,
    codModel: string,
    anoVehiculo: string,
    valorVeh: string,
    pasajeros?: string
) => {
    try {
        console.log('--> Cotizando')

        return await monumental
            .getCotizacionIndividual(
                nombre,
                apellido,
                codMarca,
                codModel,
                anoVehiculo,
                valorVeh,
                pasajeros
            )
            .then((res: any) => {
                console.log('--> Cotizacion completa')
                return res.cotizarIndividualResult.Cotizacion.map((c) => {
                    return c;
                });
            });

    } catch (e) {
        console.log(`Error en el proceso de generacion de Cotizacion: ${e}`)
        return Error(`Error en el proceso de generacion de Cotizacion`)
    }
}

/**
 * @description Crear pdf para cobertura del seguro modal
 */
export const printCobertura = async (
    params: paramsPdfMonumental
) => {
    try {

        const {
            TITULO,
            TIPO,
            MODELO,
            ID_MODELO,
            TIPO_VEHICULO,
            ANIO,
            USO,
            NOMBRES,
            APELLIDOS,
            MARCA, 
            ID_MARCA,
            PRECIO,
            COLOR,
            PRIMA,
            PRIMA_FINAL,
            PAGO_INICIAL,
            CUOTAS_MENSUALES,
            DIAS_VALIDACION,
            PLACA,
            CHASIS,
            DIRECCION,
            FECHA,
            PLAZO
        } = params

        //? crear cotizacion 
        const cotizacion = await cotizar(
            NOMBRES,
            APELLIDOS,
            ID_MARCA,
            ID_MODELO,
            ANIO,
            PRECIO,
        );

        // ? Detalle Cotizacion 
        const _title = TITULO || 'MONUMENTAL'
        const _tipe = TIPO || 'POLIZA DECLARATIVA'
        const _vehicleType = TIPO_VEHICULO || ''
        const _year = ANIO || ''
        const _use = USO || ''
        const _brand = MARCA || ''
        const _color = COLOR
        const _identity = PLACA || ''
        const _model = MODELO || ''
        const _price = PRECIO
        const _chasis = CHASIS
        const _emisorOffice = 'MONUMENTAL'
        const _subscriptionOffice = 'MONUMENTAL'
        const _names = NOMBRES
        const _lastNames = APELLIDOS
        const _direction = DIRECCION
        const _canal = "VEGAMOVIL"
        const _cotization = cotizacion[0].numcotiz
        const _date = FECHA
        const _time = PLAZO
        const _taxes = cotizacion[0].impuesto
        const _prime = cotizacion[0].primaNeta
        const _finalPrime = cotizacion[0].primaBruta
        const _initialPay = PAGO_INICIAL
        const _monthlyFeeds = CUOTAS_MENSUALES || ''
        const _validationTime = DIAS_VALIDACION || '30 días'
        const _coberturas = await monumental.getCoberturas(cotizacion[0].numcotiz)

        const path_file = await createPdfFile(
            {
                TITULO: _title, 
                TIPO: _tipe, 
                OFICINA_EMISORA: _emisorOffice , 
                OFICINA_SUSCRIPTORA: _subscriptionOffice, 
                TIPO_VEHICULO: _vehicleType, 
                ANIO: _year , 
                USO: _use, 
                ID_MARCA: _brand, 
                MARCA: _brand , 
                ID_MODELO: _model , 
                MODELO: _model, 
                COLOR: _color, 
                PLACA: _identity, 
                PRECIO: _price, 
                CHASIS: _chasis, 
                NOMBRES: _names, 
                APELLIDOS: _lastNames, 
                DIRECCION: _direction, 
                FECHA: _date, 
                PLAZO: _time, 
                CANAL: _canal, 
                NUM_COTIZACION: _cotization, 
                IMPUESTO: _taxes, 
                PRIMA: _prime, 
                PRIMA_FINAL: _finalPrime, 
                PAGO_INICIAL: _initialPay, 
                CUOTAS_MENSUALES: _monthlyFeeds, 
                DIAS_VALIDACION: _validationTime, 
                COBERTURAS: _coberturas, 
            }
        )

        return path_file

    } catch (e) {
        console.log(`Error en impresion cobertura: ${e}`)
        return Error(`Error en impresion cobertura`)
    }
}

export const createPdfFile = async (
    condition: paramsPdfMonumental

) => {
    // const aditionals = [{ key: "CENTRO ASISTENCIAL AL AUTOMOVILISTA CAA", value: "INCLUIDO" },
    // { key: "RESCATE VIAL ILIMITADO", value: "INCLUIDO" },
    // { key: "PLAN RENTA", value: "INCLUIDO" }]

    const messages = [`- La cotización es válida por ${condition.DIAS_VALIDACION}.`,
        "- Riesgo sujeto a inspección favorable a realizarse por personal autorizado de la Compañía."]
    // const aditionalsName = aditionals.map((item) => {
    //     return item.key
    // })

    // const aditionalsValue = aditionals.map((item) => {
    //     return item.value
    // })

    const showMessages = messages.map((item) => {
        return item
    })

    const x = await condition.COBERTURAS

    const coberturas = x.getCoberturasResult.Coberturas.map((cob, i) => {
        return ((i + 1) + ".  " + cob.descCobertura);
    });

    const sumas = x.getCoberturasResult.Coberturas.map((cob) => {
        return cob.sumaAsegurada;
    });

    var docDefinition = {

        header: {
            columns: [
                { text: condition.TITULO, style: 'theader' },
                { text: condition.TIPO, style: 'theader2' }
            ]
        },
        content: [
            {
                table: {
                    widths: [500],
                    body: [["Cotización de vehículo"]],
                },
                style: 'header',
                fillColor: "#adb5bd",
                layout: 'noBorders'
            },

            {
                table: {
                    widths: [100, 220, 80, 140],
                    body: [["Oficina emisora:.......: ", { text: condition.OFICINA_EMISORA, bold: true },
                        "Cotización #....:", { text: condition.NUM_COTIZACION, bold: true },],
                    ["Oficina suscriptora...:", { text: condition.OFICINA_SUSCRIPTORA, bold: true },
                        "Fecha................:", { text: condition.FECHA, bold: true }],
                    ["Nombres...................:", { text: condition.NOMBRES, bold: true },
                        "Plazo................:", { text: condition.PLAZO, bold: true }],
                    ["Apellidos...................:", { text: condition.APELLIDOS, bold: true }, "", ""],
                    ["Dirección...................:", { text: condition.DIRECCION, bold: true }, "", ""],
                    ["Intermediario............:", { text: condition.CANAL, bold: true }, "", ""]
                    ],
                },
                layout: 'noBorders',
                fontSize: 10,
            },
            {
                text: "............Detalles del vehiculo............",
                margin: [173, 10, 0, 0],
                fontSize: 10,
                bold: true
            },

            {
                table: {
                    widths: [50, 120, 70, 75, 50, 100,],
                    body: [["Tipo......:", { text: condition.TIPO_VEHICULO, bold: true },
                        "Año..................:", { text: condition.ANIO, bold: true },
                        "Uso...........:", { text: condition.USO, bold: true }],
                    ["Marca...:", { text: condition.MARCA, bold: true },
                        "Color................:", { text: condition.COLOR, bold: true },
                        "Placa........:", { text: condition.PLACA, bold: true }],
                    ["Modelo...:", { text: condition.MODELO, bold: true },
                        "Valor vehículo.:", { text: condition.PRECIO, bold: true },
                        "Chasis......:", { text: condition.CHASIS, bold: true }]],
                },
                layout: 'noBorders',
                fontSize: 9,
                margin: [0, 8, 0, 15]
            },

            {
                table: {
                    widths: [500],
                    body: [["COBERTURAS"]],
                },
                style: 'header',
                fillColor: "#adb5bd",
                layout: 'noBorders'
            },

            {
                table: {
                    widths: [390, 120],
                    body: [["DESCRIPCIÓN", "SUMA ASEGURADA"]],
                }, bold: true,
                layout: 'noBorders',
                fontSize: 10
            },
            {
                layout: 'noBorders',
                fontSize: 9,
                margin: [0, 0, 0, 10],
                table: {
                    widths: [390, 120],
                    body: [[coberturas, sumas]],
                },
            },
            // {
            //     table: {
            //         widths: [385, 100],
            //         body: [[{
            //             text: "Coberturas Adicionales",
            //             alignment: 'left',
            //             bold: true,
            //             fontSize: 10
            //         }, ""],
            //         [aditionalsName, aditionalsValue]]
            //     },
            //     layout: {
            //         hLineWidth: function (i, node) {
            //             return (i === 0 || i === node.table.body.length) ? 0 : 2;
            //         },
            //         vLineWidth: function (i, node) {
            //             return 0;
            //         },
            //     }, fontSize: 9, margin: [0, 0, 0, 8]
            // },
            {
                table: {
                    widths: [495],
                    body: [[{
                        text: `Prima Neta:....: RD ${condition.PRIMA}`,
                        alignment: 'right',
                        bold: true
                    }],
                    [{ text: `impuesto...........: RD ${condition.IMPUESTO}`, alignment: 'right' }]]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0 : 2;
                    },
                    vLineWidth: function (i, node) {
                        return 0;
                    },
                }, fontSize: 9
            },
            {
                text: `Prima Bruta....: RD ${condition.PRIMA_FINAL}`,
                alignment: "right",
                bold: true,
                margin: [0, 10, 18, 10],
                fontSize: 9
            },
            {
                text: "............Forma De Pago............",
                alignment: 'left',
                fontSize: 10,
                bold: true,
                margin: [0, 0, 0, 5]
            },
            {
                text: `Pago Inicial.................: RD ${condition.PAGO_INICIAL}`,
                alignment: 'left',
                fontSize: 9,
                margin: [20, 0, 0, 0]
            },
            {
                text: `Cuotas Mensuales.....: RD ${condition.CUOTAS_MENSUALES}`,
                alignment: 'left',
                fontSize: 9,
                margin: [20, 0, 0, 10]
            },
            {
                table: {
                    widths: [495],
                    body: [[""],
                    [showMessages]]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0 : 2;
                    },
                    vLineWidth: function (i, node) {
                        return 0;
                    },
                }, fontSize: 10,
                bold: true
            },
        ],

        footer:
        {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6469 1096" width="6469" height="1096">
            <style>
                tspan { white-space:pre }
                .shp0 { fill: #000000 } 
                .shp1 { fill: #027af2 } 
                .shp2 { fill: #484848 } 
                .shp3 { fill: #ffffff } 
            </style>
            <g id="Layer_x0020_1">
                <path id="Layer" fill-rule="evenodd" class="shp0" d="M1735.97 272.92L1861.78 651.54L1985.8 272.92L2160.88 272.92L1953.55 798.96L1766.63 798.96L1555.67 272.92L1735.97 272.92ZM2195.35 272.92L2657.06 272.92L2657.06 385.33L2368.5 385.33L2368.5 469.09L2636.01 469.09L2636.01 576.36L2368.5 576.36L2368.5 679.95L2665.63 679.95L2665.63 798.97L2195.35 798.97L2195.35 272.92ZM2996.33 608.69L2996.33 499.21L3263.06 499.21L3263.06 722.94C3211.98 755.75 3166.87 778.16 3127.76 790.05C3088.49 801.92 3041.95 807.81 2988.14 807.81C2921.85 807.81 2867.78 797.16 2826.05 775.85C2784.33 754.65 2751.97 722.95 2728.95 680.82C2705.95 638.83 2694.51 590.46 2694.51 535.97C2694.51 478.53 2707.11 428.7 2732.21 386.21C2757.29 343.84 2794.07 311.63 2842.55 289.59C2880.38 272.57 2931.33 264.12 2995.28 264.12C3056.9 264.12 3103.05 269.38 3133.59 279.91C3164.27 290.43 3189.61 306.72 3209.76 328.89C3229.9 351.06 3245.11 379.1 3255.26 413.02L3089.13 441.19C3082.23 421.23 3070.67 405.92 3054.29 395.39C3037.93 384.73 3017.11 379.47 2991.65 379.47C2953.95 379.47 2923.79 391.83 2901.3 416.56C2878.83 441.29 2867.64 480.48 2867.64 533.99C2867.64 590.81 2878.95 631.46 2901.7 655.83C2924.32 680.19 2956.02 692.45 2996.59 692.45C3015.82 692.45 3034.15 689.87 3051.7 684.61C3069.12 679.33 3089.13 670.4 3111.75 657.91L3111.75 608.69L2996.33 608.69ZM3470.27 712.28L3442.2 798.97L3266.06 798.97L3476.25 272.93L3665.12 272.93L3874.39 798.97L3693.71 798.97L3665.77 712.28L3470.27 712.28ZM3629.25 598.4L3568.29 409.32L3507.07 598.4L3629.25 598.4ZM4133.35 272.92L4220.05 593.01L4307.02 272.92L4533.58 272.92L4533.58 798.96L4392.41 798.96L4392.41 397.93L4283.49 798.96L4155.59 798.96L4046.92 397.93L4046.92 798.96L3905.75 798.96L3905.75 272.92L4133.35 272.92ZM4578.56 536.32C4578.56 450.47 4603.92 383.62 4654.74 335.85C4705.56 287.97 4776.28 264.11 4867.01 264.11C4959.95 264.11 5031.57 287.61 5081.87 334.51C5132.16 381.54 5157.26 447.42 5157.26 532.04C5157.26 593.5 5146.34 643.84 5124.37 683.14C5102.39 722.44 5070.56 753.06 5029.08 774.98C4987.49 796.9 4935.76 807.8 4873.75 807.8C4810.84 807.8 4758.72 798.36 4717.38 779.5C4676.18 760.53 4642.63 730.65 4617.04 689.74C4591.43 648.97 4578.55 597.78 4578.55 536.32L4578.56 536.32ZM4750.92 536.67C4750.92 589.7 4761.44 627.9 4782.38 651.04C4803.43 674.19 4832.03 685.82 4868.17 685.82C4905.22 685.82 4934.06 674.43 4954.34 651.78C4974.75 629 4984.9 588.35 4984.9 529.45C4984.9 479.97 4974.23 443.85 4953.05 421.07C4931.73 398.18 4903 386.79 4866.61 386.79C4831.79 386.79 4803.7 398.42 4782.64 421.56C4761.44 444.71 4750.92 483.15 4750.92 536.66L4750.92 536.67ZM5306.36 272.92L5432.19 651.54L5556.19 272.92L5731.27 272.92L5523.96 798.96L5337.04 798.96L5126.08 272.92L5306.36 272.92ZM5772.77 272.92L5945.92 272.92L5945.92 798.96L5772.77 798.96L5772.77 272.92ZM6198.61 272.92L6198.61 669.66L6468.47 669.66L6468.47 798.96L6026.25 798.96L6026.25 272.92L6198.61 272.92Z" />
                <path id="Layer" fill-rule="evenodd" class="shp1" d="M613.76 6.09C492.94 6.09 383.43 56.91 305.51 138.22C339.24 141.66 372.08 155.99 398.3 181.3L692.24 465.03L987.21 182.41C1049.63 122.6 1149.13 124.71 1208.94 187.13L1255.68 235.9L1255.68 113.38C1255.68 54.37 1207.4 6.09 1148.39 6.09L613.76 6.09ZM1255.68 476.82L1255.68 476.84L1255.69 476.83L1255.68 476.82ZM1255.68 476.84L708.06 1002.3L691.21 1018.47L674.14 1001.99L186.41 530.49L186.41 983.64C186.41 1041.91 234.08 1089.58 292.35 1089.58L827 1089.58C1062.78 1089.58 1255.68 896.68 1255.68 660.91L1255.68 476.84Z" />
                <path id="Layer" fill-rule="evenodd" class="shp2" d="M1148.39 0C1179.55 0 1207.93 12.76 1228.47 33.3L1228.47 33.32C1248.99 53.86 1261.78 82.21 1261.78 113.39L1261.78 660.92C1261.78 780.46 1212.84 889.19 1134.06 967.97C1055.28 1046.75 946.55 1095.68 827.01 1095.68L292.36 1095.68C261.55 1095.68 233.54 1083.06 213.24 1062.77L213.22 1062.75C192.93 1042.45 180.31 1014.41 180.31 983.63L180.31 433.43C180.31 314.26 229.08 205.85 307.62 127.31C386.16 48.77 494.57 0 613.74 0L1148.39 0ZM1148.39 12.19L613.75 12.19C497.9 12.19 392.57 59.59 316.23 135.92C239.9 212.26 192.5 317.59 192.5 433.44L192.5 983.64C192.5 1011.09 203.75 1036.08 221.81 1054.17L221.83 1054.19C239.92 1072.25 264.91 1083.49 292.36 1083.49L827.01 1083.49C943.21 1083.49 1048.88 1035.93 1125.46 959.36C1202.04 882.79 1249.59 777.11 1249.59 660.92L1249.59 113.39C1249.59 85.55 1238.17 60.23 1219.87 41.92C1201.54 23.59 1176.21 12.2 1148.4 12.2L1148.39 12.19Z" />
                <path id="Layer" fill-rule="evenodd" class="shp3" d="M7.06 358.62C15.08 530.82 69.93 707.04 186.46 820.83L186.46 532.04L7.06 358.63L7.06 358.62Z" />
                <path id="Layer" fill-rule="evenodd" class="shp2" d="M55.01 626.03C22.52 542.31 5.21 449.97 0.97 358.88L11.26 354.24L190.66 527.66L192.55 529.5L192.55 835.27L182.22 825.18C126.31 770.58 84.42 701.78 55.01 626.04L55.01 626.03ZM13.97 373.77L13.98 373.78C13.98 373.78 13.98 373.77 13.98 373.77L13.97 373.77ZM66.33 621.65C93.3 691.09 130.89 754.5 180.35 806.04L180.35 534.6L13.98 373.78C19.32 458.61 36.18 543.94 66.33 621.65Z" />
                <path id="Layer" fill-rule="evenodd" class="shp3" d="M1374.57 364.73C1369.48 473.85 1336.88 613.16 1255.62 664.48L1255.62 478.86L1374.57 364.73Z" />
                <path id="Layer" fill-rule="evenodd" class="shp2" d="M1384.61 361.04C1381.76 422.18 1366.36 496.74 1342.68 556.39C1323.52 604.72 1296.23 646.02 1258.86 669.61L1249.54 675.51L1249.54 476.3L1251.43 474.48L1370.36 360.34L1384.61 361.03L1384.61 361.04ZM1331.39 551.91C1352.56 498.58 1363.72 436.08 1367.59 379.85L1261.72 481.44L1261.72 652.88C1291.97 630.07 1314.75 593.84 1331.39 551.91Z" />
                <path id="Layer" fill-rule="evenodd" class="shp3" d="M692.23 465.03L987.21 182.41C1049.63 122.6 1149.13 124.72 1208.94 187.14L1281.24 262.59L1280.67 263.35L1376.24 361.17L708.07 1002.31L691.21 1018.48L674.15 1002L8.62 358.64L104.56 261.16L103.99 260.4L176.56 185.24C236.6 123.04 336.1 121.29 398.3 181.33L692.23 465.05L692.23 465.03Z" />
                <path id="Layer" fill-rule="evenodd" class="shp2" d="M692.25 456.6L983 178.02C1015.43 146.94 1057.5 131.96 1099.17 132.85C1140.87 133.74 1182.27 150.51 1213.32 182.92L1285.62 258.37L1289.23 262.15L1288.69 262.85L1380.58 356.91L1384.87 361.29L1380.44 365.53L712.27 1006.67L695.42 1022.84L691.21 1026.9L687.01 1022.84L669.94 1006.36L4.42 363L0.01 358.73L4.3 354.36L96.58 260.59L96.06 259.89L99.63 256.18L172.19 181.01C203.37 148.71 244.83 132.06 286.53 131.34C328.23 130.62 370.24 145.77 402.52 176.91L692.26 456.59L692.25 456.6ZM991.42 186.78L696.45 469.41L692.24 473.45L688.03 469.41L394.09 185.68C364.21 156.85 325.32 142.82 286.71 143.5C248.13 144.17 209.78 159.56 180.94 189.42L111.95 260.9L112.54 261.7L108.89 265.4L17.25 358.51L678.35 997.6L691.23 1010.03L703.85 997.91L1367.61 361.01L1276.32 267.58L1272.66 263.82L1273.27 263.04L1204.56 191.34C1175.85 161.36 1137.54 145.83 1098.95 145.02C1060.35 144.22 1021.4 158.06 991.42 186.8L991.42 186.78Z" />
            </g>
            </svg>`,
            alignment: 'right',
            width: 180,
            margin: [0, 0, 28, 0]
        },

        styles: {
            tableExample: {
                paddingLeft: 0
            },
            header: {
                alignment: "center",
                color: '#000',
                fontSize: 11,
                bold: true,
            },
            theader: {
                alignment: 'left',
                bold: true,
                fontSize: 15,
                margin: [40, 10, 0, 0]
            },
            theader2: {
                alignment: 'right',
                bold: true,
                fontSize: 15,
                margin: [0, 10, 55, 0]
            }
        },
    };
    const path_root = `./assets/cotizacion_seguro/`
    const file_name = `cotizacion_no_${condition.NUM_COTIZACION}.pdf`
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(path.join(path_root, file_name) ));
    pdfDoc.end();

    return file_name
}
