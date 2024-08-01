import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }]
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.method('toJSON', function() {
  const { __v, ...object } = (this as any).toObject();
  return object;
});

const Contact = model("Contact", contactSchema);

export default Contact;