import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
    responses: [
      {
        quesId: {
          type: Number,
          required: true,
        },
        response: {
          type: String,
          enum: ["A", "B", ""],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    sq: {
      type: String,
      required: true,
    },
    answered_count: {
      type: Number,
      required: true,
      default: 0,
    },

    Disciplined_Saver: {
      type: Number,
      required: true,
      default: 0,
    },
    Balanced_Spender: {
      type: Number,
      required: true,
      default: 0,
    },
    The_Hustler: {
      type: Number,
      required: true,
      default: 0,
    },
    Hopeful_Borrower: {
      type: Number,
      required: true,
      default: 0,
    },
    Live_for_today_Spender: {
      type: Number,
      required: true,
      default: 0,
    },

    wealth: {
      type: Number,
      required: true,
      default: 0,
    },
    investment: {
      type: Number,
      required: true,
      default: 0,
    },

    avgResponseTime: {
      type: Number,
      default: 0,
    },

    version: {
      type: Number,
      default: 0,
    },
    prevScore: {
      type: [Object],
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ session: 1 });
userSchema.index({ wealth: -1 });
userSchema.index({ investment: -1 });

const User = mongoose.model("User", userSchema);

export { User };
