import { Aggregate, Schema, model } from "mongoose";

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

const baseDate = new Date("2024-11-26T00:00:00Z");

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
    createdAt: {
      type: Date,
      default: Date.now,
      /**
       * As the dates in the designs are fixed we want to pretend that some of them were created recently
       * so that they can be ranked by recent usage
       * We just add a fixed amount of time to the createdAt date so it is always the same regardless of
       * when this code is run
       */
      get: (originalDate: Date) => {
        const timeSinceBaseDate = Date.now() - baseDate.getTime();
        return new Date(originalDate.getTime() + timeSinceBaseDate);
      },
    },
  },
  { timestamps: false, toJSON: { getters: true }, toObject: { getters: true } }
);

// Correct createdAt date for aggregations
DesignSchema.plugin((schema) => {
  schema.pre("aggregate", function (this: Aggregate<any>) {
    const timeSinceBaseDate = Date.now() - baseDate.getTime();

    this.pipeline().unshift({
      $set: {
        createdAt: {
          $add: ["$createdAt", timeSinceBaseDate],
        },
      },
    });
  });
});

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
