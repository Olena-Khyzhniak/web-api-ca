import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  movieId: {
    type: Number,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  posterPath: {
    type: String,
  },

  releaseDate: {
    type: String,
  },

  voteAverage: {
    type: Number,
  },

  overview: {
    type: String,
  },

  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});


MovieSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model("Movie", MovieSchema);
