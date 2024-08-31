import { Schema, model} from 'mongoose'

const notifymessage = new Schema(
    {

        message: {
            type: String,
            required: true,
          },
          from: {
            type: String,
            required: true,
          },
          to: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          }
   
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

notifymessage.method('toJSON', function() {
    const { __v, ...object } = (this as any).toObject();
    return object;
});

const Notifymessage = model("Notificacion", notifymessage);

export default Notifymessage;
