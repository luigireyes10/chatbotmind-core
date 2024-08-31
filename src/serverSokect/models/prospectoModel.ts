import { Schema, model } from 'mongoose'

const propectoSchema = new Schema(
  {
    Desc_Prospecto: {
      type: String,
      required: true,
    },
    ID_Prospecto: {
      type: Schema.Types.ObjectId,
      required: true,
   
    },
    Date : {
      type: String,
      default: () => {
        const date = new Date();
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${months[date.getMonth()]} ${date.getDate()}`;
      }
    },
  
    ID_Cliente: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    Estado: { type: String, default: "A" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

propectoSchema.method('toJSON', function () {
  const { __v, ...object } = (this as any).toObject()
  return object
})

export default model('Prospecto', propectoSchema)
