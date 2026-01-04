import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  productId: string
  productSlug: string
  userName: string
  userEmail: string
  rating: number
  comment: string
  createdAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: {
      type: String,
      required: true,
    },
    productSlug: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default Review
