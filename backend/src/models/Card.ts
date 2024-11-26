import { Schema, Document, Types, model } from "mongoose";
import mongooseDelete, {
  SoftDeleteModel,
  SoftDeleteInterface,
} from "mongoose-delete";

export interface ICard extends SoftDeleteInterface {
  designId: Types.ObjectId;
  recipient?: {
    name?: string;
    email?: string;
  };
  from?: string;
  type?: "board" | "card" | "collection" | "shoutout";
  title?: string;
  teamMessage?: string;
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
      _id: { type: Schema.Types.ObjectId },
      name: { type: String },
      email: { type: String, select: false },
      additionalEmails: { type: [String], select: false, default: undefined },
      token: { type: String, select: false },
      unsubscribed: { type: Boolean, select: false },
    },
    type: { type: String },
    title: { type: String },
    teamMessage: { type: String },
    from: { type: String },
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
CardSchema.index(
  { deliveryDate: 1, sent: 1 },
  { partialFilterExpression: { "payment.paid": true, sent: false } }
);
CardSchema.index({ createdAt: 1 });

CardSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

const Card = model<ICardModel, SoftDeleteModel<ICardModel>>("Card", CardSchema);

export const publicFields = [
  "designId",
  "recipient.name",
  "payment.paid",
  "deliveryDate",
  "shareId",
  "creator",
  "type",
  "title",
  "createdAt",
  "confetti",
  "enableHidden",
  "customDesign",
  "customDesignVersion",
  "from",
  "theme",
  "teamMessage",
  "individual",
  "premium",
];
export const ownerFields = [
  ...publicFields,
  "recipient.email",
  "recipient.additionalEmails",
  "payment.amount",
  "payment.datePaid",
  "payment.printPaid",
  "payment.currency",
  "payment.voucher",
  "customisable",
  "sent",
  "sendFail",
  "viewedAt",
  "archived",
];

export default Card;
