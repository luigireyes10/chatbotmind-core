import { Schema, model } from "mongoose";
const mediaObjSchema = new Schema({

  url: {
    type: String,
    required: true,
  },
  mime_type: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_size: {
    type: Number,
    required: false,
  },
});

const messageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message:  {
      type: String,
      required: false,
    },
    file: {
      type: String,
      required: false,
    },
    Estado: {
      type: String,
      required: false,
      default: "Active",
    },

    message_type: {
      type: Number,
      required: true,
      enum: [1, 2], 
    },
    media:  {
      type:[mediaObjSchema],
      required: false,
    },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    omitUndefined: true, 
  }
);

messageSchema.method("toJSON", function () {
  const { __v, ...object } = (this as any).toObject();
  if (object.media && object.media.length === 0) {
    delete object.media;
  }
  return object;
});
const Message = model("Message", messageSchema);

export default Message;
