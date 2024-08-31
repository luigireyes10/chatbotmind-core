import { Arg, Query, Resolver } from "type-graphql";
import { getConnection, getRepository, Repository } from "typeorm";
import { ID_EMPRESA } from "../constants/general";
import { Cliente } from "../entity/Cliente";
import {
  BalanceClientCharges,
  BalanceClientFinancings,
  ClientCollectOficial,
  ClientCXCInput,
  ClientFinancingsDetails,
  ClientFinancingsDetailsByLoan,
  ClientFinancingsGeneralData,
} from "../typeDef/generalClientInputs";

const ClienteRepos = (): Repository<Cliente> => getRepository(Cliente);

@Resolver()
export class ClienteResolver {
  async GetCliente(@Arg("CEDULA", () => String) CEDULA: string) {
    try {
      const cliente = await ClienteRepos().find({
        where: {
          DOCUMENTO_IDENTIDAD: CEDULA,
          ID_EMPRESA: ID_EMPRESA,
        },
      });

      return cliente;
    } catch (e) {
      console.error(e);
    }
  }

  @Query(() => [BalanceClientFinancings], {
    description: "Consultar Totales Cuota(s) Financiamiento.",
    name: "TotalsFinancings",
  })
  async GetFinancingTotals(
    @Arg("condition", () => ClientCXCInput)
    condition: ClientCXCInput
  ) {
    try {
      const { ID_CLIENTE, ID_EMPRESA, TIPO_BALANCE, ID_MONEDA } = condition;

      const [result] = await getConnection().query(
        `SELECT pkg_web_refcursor.dame_balance_cliente (PCLIENTE   => ${ID_CLIENTE}, PEMPRESA   => ${ID_EMPRESA}, PIDMONEDA => '${ID_MONEDA}',PTIPO => '${TIPO_BALANCE}') AS cuotas FROM DUAL`
      );
      return result.CUOTAS;
    } catch (e) {
      console.log(`Error en Query <GetFinancingTotals>: ${e}`);
      return e;
    }
  }

  @Query(() => [BalanceClientCharges], {
    description: "Consultar Cargos Totales.",
  })
  async GetClientCharges(
    @Arg("condition", () => ClientCXCInput)
    condition: ClientCXCInput
  ) {
    try {
      const { ID_CLIENTE, ID_EMPRESA, ID_MONEDA } = condition;

      const [result] = await getConnection().query(
        `SELECT pkg_web_refcursor.dame_balance_cargos (PCLIENTE   => ${ID_CLIENTE}, PEMPRESA   => ${ID_EMPRESA}, PIDMONEDA => '${ID_MONEDA}') AS cargos FROM DUAL`
      );
      return result.CARGOS;
    } catch (e) {
      console.log(`Error en Query <GetClientCharges>: ${e}`);
      return e;
    }
  }

  @Query(() => [BalanceClientCharges], {
    description: "Consultar Detalles Cargos Cliente.",
  })
  async GetClientChargesDetails(
    @Arg("condition", () => ClientCXCInput)
    condition: ClientCXCInput
  ) {
    try {
      const { ID_CLIENTE, ID_EMPRESA, ID_MONEDA } = condition;
      const [result] = await getConnection().query(
        `SELECT pkg_web_refcursor.dame_detalles_cargos (PCLIENTE   => ${ID_CLIENTE}, PEMPRESA   => ${ID_EMPRESA}, PIDMONEDA => '${ID_MONEDA}') AS cargos FROM DUAL`
      );
      return result.CARGOS;
    } catch (e) {
      console.log(`Error en Query <GetClientChargesDetails>: ${e}`);
      return e;
    }
  }

  @Query(() => [ClientFinancingsDetailsByLoan], {
    description: "Consultar Detalles Cuota(s) Financiamiento.",
  })
  async GetFinancingDetails(
    @Arg("condition", () => ClientCXCInput)
    condition: ClientCXCInput
  ) {
    try {
      const { ID_CLIENTE, ID_EMPRESA, TIPO_BALANCE, ID_MONEDA } = condition;
      const restructuredData = [];
      let cuotas = [];
      const [result] = await getConnection().query(
        `SELECT pkg_web_refcursor.dame_detalles_balance_cliente (PCLIENTE   => '${ID_CLIENTE}', PEMPRESA   => '${ID_EMPRESA}', PIDMONEDA => '${ID_MONEDA}', PTIPO => '${TIPO_BALANCE}') AS cuotas FROM DUAL`
      );
      const loans = result.CUOTAS.map((loan) => loan.ID_PRESTAMO);
      let getLoansID = (loans) =>
        loans.filter((value, index) => loans.indexOf(value) === index);
      const onlyLoansArray = getLoansID(loans);

      onlyLoansArray.forEach((idPrestamo, index) => {
        cuotas[index] = result.CUOTAS.filter(
          (data) => data.ID_PRESTAMO === idPrestamo
        );
        restructuredData[index] = {
          ID_PRESTAMO: idPrestamo,
          DESCRIPCION_OFERTA: cuotas[index][0].DESCRIPCION_OFERTA,
          VEHICULO_FINANCIADO: cuotas[index][0].VEHICULO_FINANCIADO,
          CUOTAS: cuotas[index],
        };
      });
      return restructuredData;
    } catch (e) {
      console.log(`Error en Query <GetFinancingDetails>: ${e}`);
      return e;
    }
  }

  @Query(() => [ClientFinancingsDetails], {
    description: "Consultar Cuota(s) Pendientes.",
  })
  async GetFinancingPendings(
    @Arg("condition", () => ClientCXCInput)
    condition: ClientCXCInput
  ) {
    try {
      const { ID_CLIENTE, ID_EMPRESA, ID_MONEDA } = condition;

      const [result] = await getConnection().query(
        `SELECT pkg_web_refcursor.dame_cuotas_pendientes_cliente (PCLIENTE   => '${ID_CLIENTE}', PEMPRESA   => '${ID_EMPRESA}', PIDMONEDA => '${ID_MONEDA}') AS cuotas FROM DUAL`
      );
      return result.CUOTAS;
    } catch (e) {
      console.log(`Error en Query <GetFinancingPendings>: ${e}`);
      return e;
    }
  }

  @Query(() => [ClientFinancingsGeneralData], {
    description: "Consultar Data General de Financiamientos.",
  })
  async GetFinancingGeneralData(
    @Arg("condition", () => ClientCXCInput)
    condition: ClientCXCInput
  ) {
    try {
      const { ID_CLIENTE, ID_EMPRESA } = condition;

      const [result] = await getConnection().query(
        `SELECT pkg_web_refcursor.dame_financiamientos_cliente (PCLIENTE   => '${ID_CLIENTE}', PEMPRESA   => '${ID_EMPRESA}') AS financiamientos FROM DUAL`
      );
      return result.FINANCIAMIENTOS;
    } catch (e) {
      console.log(`Error en Query <GetFinancingGeneralData>: ${e}`);
      return e;
    }
  }

  @Query(() => [ClientCollectOficial], {
    description: "Consultar oficiales de cobro.",
  })
  async GetClientCollectOficial(
    @Arg("condition", () => ClientCXCInput)
    condition: ClientCXCInput
  ) {
    try {
      const { ID_CLIENTE, ID_EMPRESA } = condition;

      const query = `SELECT CR.ID_REPRESENTANTE ID_OFICIAL,
            CR.NOMBRES || ' ' || CR.APELLIDOS OFICIAL,
            CR.TELEFONO,
            CR.EXTENSION,
            CR.EMAIL
       FROM CLIENTE_REPRESENTANTE CR
      WHERE     CR.ID_EMPRESA = ${ID_EMPRESA}
            AND CR.ESTADO = 'A'
            AND CR.ID_REPRESENTANTE =
                   PKG_CLIENTE.get_oficial_cte (CR.ID_EMPRESA, ${ID_CLIENTE})`;

      const data = await getConnection().query(query);

      return data;
    } catch (e) {
      console.log(`Error en Query <GetClientCollectOficial>' ${e}`);
      return Error("Error al consultar representantes.");
    }
  }
}
