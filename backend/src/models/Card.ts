import { Schema, Document, Types, model } from "mongoose";
export interface ICard {
  designId: Types.ObjectId;
  recipient?: {
    name?: string;
    email?: string;
  };
  payment?: {
    paid?: boolean;
    datePaid?: Date;
  };
  deliveryDate?: Date;
  shareId: string;
  sent: boolean;
}

export interface ICardModel extends ICard, Document {}

const CardSchema = new Schema<ICardModel>(
  {
    designId: { type: Schema.Types.ObjectId, ref: "Design", index: true },
    recipient: {
      name: { type: String },
      email: { type: String, select: false },
    },
    payment: {
      paid: { type: Boolean },
      datePaid: { type: Date },
    },
    deliveryDate: { type: Date },
    shareId: {
      type: String,
      index: {
        unique: true,
        partialFilterExpression: { shareId: { $exists: true } },
      },
    },
    sent: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

CardSchema.index({ "payment.paid": 1, "payment.datePaid": -1 });

const Card = model<ICardModel>("Card", CardSchema);

export default Card;
