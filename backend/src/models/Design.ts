import { Schema, Document, model } from "mongoose";

export interface IDesign {
  categories: string[];
  name: string;
  active: boolean;
  caption: string;
  designer?: string;
  group?: string;
  groupOnly?: boolean;
  groupVariant?: string;
  customisable: boolean;
  uploadableDesignCover: boolean;
  updatedAt: Date;
  createdAt: Date;
  format?: "gif" | "png" | "jpg" | "jpeg";
  addedBy?: Schema.Types.ObjectId;
  tags?: string[];
  recentUsage?: number;
}

export interface IDesignModel extends IDesign {}

const DesignSchema = new Schema<IDesign>(
  {
    name: { type: String },
    active: { type: Boolean },
    caption: { type: String },
    categories: [{ type: String, index: true }],
    uploadableDesignCover: { type: Boolean },
    group: { type: String, index: true },
    groupVariant: { type: String },
    groupOnly: { type: Boolean },
    customisable: { type: Boolean },
    format: { type: String },
    tags: {
      type: [String],
      select: false,
      index: true,
      set: (v: string[]) => Array.from(new Set(v)),
    },
    recentUsage: { type: Number, select: false },
  },
  { timestamps: true }
);

DesignSchema.index(
  { group: 1, groupVariant: 1 },
  {
    unique: true,
    partialFilterExpression: {
      group: { $exists: true },
      groupVariant: { $exists: true },
    },
  }
);

const Design = model<IDesignModel>("Design", DesignSchema);

export default Design;
