import { Field, InputType } from "type-graphql";

@InputType()
export class vinInput {

    @Field({ nullable: true })
    MANUFACTURER?: string

    @Field({ nullable: true })
    ADDRESS_LINE_1?: string

    @Field({ nullable: true })
    ADDRESS_LINE_2?: string

    @Field({ nullable: true })
    REGION?: string

    @Field({ nullable: true })
    COUNTRY?: string

    @Field({ nullable: true })
    NOTE?: string

    @Field({ nullable: true })
    ENTERED_VIN?: string

    @Field({ nullable: true })
    CORRECTED_VIN?: string

    @Field({ nullable: true })
    SQUISH_VIN?: string

    @Field({ nullable: true })
    WMI?: string

    @Field({ nullable: true })
    VIS_IDENTIFIER?: string

    @Field({ nullable: true })
    VDS?: string

    @Field({ nullable: true })
    YEAR_IDENTIFIER?: string

    @Field({ nullable: true })
    SERIAL_NUMBER?: string

    @Field({ nullable: true })
    VIN_TYPE?: string

    @Field({ nullable: true })
    CHECK_DIGIT?: string

    @Field({ nullable: true })
    MAKE?: string

    @Field({ nullable: true })
    MODEL?: string

    @Field({ nullable: true })
    MODEL_YEAR?: string

    @Field({ nullable: true })
    BODY_STYLE?: string

    @Field({ nullable: true })
    ENGINE_TYPE_BAS?: string

    @Field({ nullable: true })
    TRANSMISSION?: string

    @Field({ nullable: true })
    MANUFACTURED_IN?: string

    @Field({ nullable: true })
    POWER_STEERING?: string

    @Field({ nullable: true })
    TILT_STEERING_WHEEL?: string

    @Field({ nullable: true })
    ABS_BRAKES?: string

    @Field({ nullable: true })
    POWER_WINDOWS?: string

    @Field({ nullable: true })
    FRONT_AIR_CONDITIONING?: string

    @Field({ nullable: true })
    BODY_TYPE?: string

    @Field({ nullable: true })
    NUMBER_OF_DOOR?: string

    @Field({ nullable: true })
    DISPLACEMENT_SI?: string

    @Field({ nullable: true })
    DISPLACEMENT_CID?: string

    @Field({ nullable: true })
    DISPLACEMENT_NORMAL?: string

    @Field({ nullable: true })
    ENGINE_TYPE_ES?: string

    @Field({ nullable: true })
    ENGINE_HEAD?: string

    @Field({ nullable: true })
    ENGINE_VALVES?: string

    @Field({ nullable: true })
    ENGINE_CYLINDERS?: string

    @Field({ nullable: true })
    ENGINE_ASPIRATION?: string

    @Field({ nullable: true })
    AUTOMATIC_GEARBOX?: string

    @Field({ nullable: true })
    FUEL_TYPE?: string

    @Field({ nullable: true })
    DRIVELINE?: string

    @Field({ nullable: true })
    GVWR_RANGE?: string

    @Field({ nullable: true })
    VIN_CODE?: string
}
