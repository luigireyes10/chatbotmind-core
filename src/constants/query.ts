const query = `SELECT VEHICULO,
                REFERENCIA,
                REFERENCIA_INF,
                ANO,
                MARCA,
                ID_MARCA,
                MODELO,
                ID_MODELO,
                ESTILO,
                ID_ESTILO,
                COLOR_EXTERIOR,
                COLOR_INTERIOR,
                PRECIO,
                PRECIO_RD,
                PRECIO_SALON_F,
                PRECIO_WEB_F,
                PRECIO_MINIMO_F,
                PRECIO_GERENCIAL_F,
                PRECIO_DEALER_F,
                PRECIO_OFERTA_F,
                ID_MONEDA,
                TASA,
                ID_VEHICULO,
                SECUENCIA_ENTRADA,
                ID_EMPRESA,
                TRANSMISION,
                TRACCION,
                COMBUSTIBLE,
                CILINDRAJE,
                CILINDROS,
                CHASIS,
                ESTADO,
                EXISTE,
                CONDICION,
                FECHA_DISPONIBLE,
                ID_PRODUCTO,
                UBICACION,
                DESTADO,
                MILLAJE,
                MONTO_TRASPASO,
                NO_BOLSA_AIRE,
                CONDICION_FISICA,
                USO,
                CAMBIO_CAJA,
                TIEMPO_GARANTIA,
                GOMAS_NUEVAS,
                ULTIMA_FECHA_ENTRADA,
                FILA_ASIENTO,
                CANT_PUERTA,
                PASAJEROS, 
                RUTA_DOCUMENTO
        FROM (SELECT vehiculo,
                        referencia,
                        ano,
                        id_marca,
                        id_modelo,
                        id_estilo,
                        marca,
                        modelo,
                        estilo,
                        color_exterior,
                        color_interior,
                        DECODE (id_moneda, 'US', precio, precio / tasa) precio,
                        DECODE (id_moneda, 'RD', precio, (precio * tasa)) precio_rd,
                        id_moneda,
                        tasa,
                        id_vehiculo,
                        secuencia_entrada,
                        id_empresa,
                        chasis,
                        estado,
                        DECODE (estado, 'N', 'noexiste', 'existe') existe,
                        id_producto,
                        ubicacion,
                        return_estado_veh ('3', chasis, secuencia_entrada) DESTADO,
                        fecha_disponible,
                        condicion,
                        millaje,
                        monto_traspaso,
                        condicion_fisica,
                        precio_oferta_f,
                        precio_salon_f,
                        precio_web_f,
                        precio_minimo_f,
                        precio_gerencial_f,
                        precio_dealer_f,
                        transmision,
                        combustible,
                        cilindraje,
                        cilindros, 
                        referencia_inf,
                        NO_BOLSA_AIRE,
                        uso,
                        cambio_caja,
                        traccion,
                        tiempo_garantia,
                        gomas_nuevas,
                        ultima_fecha_entrada,
                        fila_asiento,
                        cant_puerta,
                        pasajeros,
                        RUTA_DOCUMENTO
                FROM (SELECT  vm.descripcion
                                || ' '
                                || mv.descripcion
                                || ' '
                                || ve.descripcion
                                vehiculo,
                                vm.descripcion marca, 
                                mv.descripcion modelo,
                                ve.descripcion estilo,
                                vh.id_empresa,
                                vh.color color_exterior,
                                vh.color_interior,
                                vh.ano,
                                vh.referencia,
                                vh.id_vehiculo,
                                vh.secuencia_entrada,
                                pp.precio_venta_impuesto precio,
                                pp.id_moneda,
                                tm.tasa_trans tasa,
                                vh.chasis,
                                return_estado_apart_veh (vh.id_empresa,
                                                        vh.secuencia_entrada,
                                                        vh.chasis) estado,
                                vh.fila_asiento,
                                cant_puerta,
                                VH.pasajeros, 
                                vh.id_producto,
                                TO_CHAR (vh.fecha_disponible,
                                        'FMMONTH',
                                        'nls_date_language=spanish')
                                fecha_disponible,
                                --id_estado_veh 
                                --lco.DESCRIPCION
                                CASE
                                WHEN lco.DESCRIPCION LIKE '%NUEVO%' THEN 'NUEVO'
                                WHEN lco.DESCRIPCION LIKE '%USADO%' THEN 'USADO'
                                ELSE 'IMPORTADO' 
                                END AS condicion,
                                return_ubicacion_veh ('3',
                                                    pp.id_producto,
                                                    chasis,
                                                    '1')
                                ubicacion,
                                millaje,
                                --vh.monto_traspaso,
                                -- DECODE (
                                --   fget_Costo_traspaso (vh.id_empresa, vh.chasis),
                                --   0, vh.monto_traspaso,
                                --   fget_Costo_traspaso (vh.id_empresa, vh.chasis))
                                monto_traspaso,                
                                vh.id_marca,
                                vh.id_modelo,
                                vh.id_estilo,
                                vh.id_tipo_vehiculo,
                                vh.id_tipo_carroceria,
                                vh.id_combustible,
                                vh.id_transmision,
                                vh.id_traccion,
                                vh.id_estado_veh,
                                ld.descripcion transmision,
                                vh.cilindraje,
                                vh.cilindros, 
                                lc.descripcion combustible,
                                vh.referencia_inf,
                                transaccional.busca_precio_canal ('3', chasis, '11')
                                precio_oferta_f,
                                transaccional.busca_precio_canal ('3', chasis, '1')
                                precio_salon_f,
                                transaccional.busca_precio_canal ('3', chasis, '2')
                                precio_web_f,
                                transaccional.busca_precio_canal ('3', chasis, '5')
                                precio_minimo_f,
                                transaccional.busca_precio_canal ('3', chasis, '12')
                                precio_gerencial_f,
                                transaccional.busca_precio_canal ('3', chasis, '4')
                                precio_dealer_f,
                                return_estado_veh ('3',
                                                vh.chasis,
                                                vh.secuencia_entrada)
                                estado_vehiculo,
                                vh.NO_BOLSA_AIRE,
                                lf.descripcion condicion_fisica,
                                lu.descripcion uso,
                                face_lift cambio_caja,
                                lt.descripcion traccion,
                                pkg_vehiculos.dame_garantia_veh (vh.id_empresa,
                                                                vh.chasis)
                                tiempo_garantia,
                                NVL (vh.gomas_nuevas, 0) gomas_nuevas,
                                pkg_vehiculos.get_ult_fecha_entrada (
                                '3',
                                vh.secuencia_entrada,
                                vh.chasis)
                                  ultima_fecha_entrada,
                                (
                            SELECT 
    REPLACE(REPLACE(RUTA_DOCUMENTO, 'K:\\VM', 'http://vm-db.vegamovil.local:9999/vm/vimg'), '\\', '/') AS RUTA_DOCUMENTO 
    FROM VEHICULO_DOCUMENTO
    WHERE ID_VEHICULO = vh.id_vehiculo
    AND SECUENCIA = 1) RUTA_DOCUMENTO
                        FROM moneda tm,
                                lista_parametro_det lu,
                                lista_parametro_det lf,
                                lista_parametro_det lc,
                                lista_parametro_det ld,
                                lista_parametro_det lt,
                                lista_parametro_det lco, 
                                producto_precio pp,
                                producto_servicios ps,
                                tipo_vehiculo tv,
                                vehiculo_estilo ve,
                                vehiculo_marca vm,
                                vehiculo_modelo mv,
                                vehiculo vh
                        WHERE     vh.id_empresa = '3'
                                AND vh.id_empresa = vm.id_empresa
                                AND vh.id_marca = vm.id_marca
                                AND vh.estado IN ('A', 'P')
                                AND vh.id_empresa = mv.id_empresa
                                AND vh.id_modelo = mv.id_modelo
                                AND vh.id_empresa = ve.id_empresa(+)
                                AND vh.referencia = NVL ('', vh.referencia)
                                AND vh.chasis = NVL ('', vh.chasis)
                                AND vh.id_marca = ve.id_marca(+)
                                AND vh.id_modelo = ve.id_modelo(+)
                                AND vh.id_estilo = ve.id_estilo(+)
                                AND vh.id_tipo_vehiculo = tv.id_tipo_vehiculo
                                AND vh.id_empresa = pp.id_empresa(+)
                                AND vh.chasis = pp.cod_barra(+)
                                AND ps.id_empresa = pp.id_empresa
                                AND ps.id_producto = pp.id_producto
                                AND ps.ventas = 1
                                AND vh.id_empresa = tm.id_empresa
                                AND pp.id_moneda = tm.id_moneda
                                AND lt.id_empresa(+) = vh.id_empresa
                                AND lt.id_lista(+) = '21'
                                AND lt.valor(+) = vh.id_traccion
                                AND ld.id_empresa(+) = vh.id_empresa
                                AND ld.id_lista(+) = '24'
                                AND ld.valor(+) = vh.id_transmision
                                AND lc.id_empresa(+) = vh.id_empresa
                                AND lc.id_lista(+) = '22'
                                AND lc.valor(+) = vh.id_combustible
                                AND vh.id_empresa = lf.id_empresa(+)
                                AND vh.id_condicion_fisica = lf.valor(+)
                                AND lf.id_lista(+) = '87'
                                AND vh.id_empresa = lu.id_empresa(+)
                                AND vh.id_uso = lu.valor(+)
                                AND lu.id_lista(+) = '26'                            
                                AND lco.valor(+) = vh.id_estado_veh
                                AND lco.id_empresa(+) = vh.id_empresa
                                AND lco.ID_LISTA(+) = '25'
                                AND vh.fecha_incautacion IS NULL
                                AND vh.uso_interno = 0)
                            WHERE 1 = 1)
                    WHERE estado = 'N' 
                   -- and destado = 'DISPONIBLE' -- QUITAR
                   -- and COMBUSTIBLE='GASOLINA' -- QUITAR
                    --AND CONDICION LIKE '%USADO%'
                    AND ANO >='2015'
                    ORDER BY vehiculo`