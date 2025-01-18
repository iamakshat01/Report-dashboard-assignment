const { model, Schema } = require("mongoose");

const FileSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    OriginalName: {
      type: String,
      required: true,
    },
    OriginalPath: {
      type: String,
      required: true,
      unique: true,
    },
    Tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("File", FileSchema);
