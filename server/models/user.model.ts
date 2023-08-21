import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

export type CustomFields = { [key: string]: string };
export interface IUser {
  email: string;
  password: string;
  customFields: CustomFields;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  customFields: {
    type: Schema.Types.Map,
    of: Schema.Types.String,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      } else if (user.password) {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});
const User = model("User", UserSchema);
export default User;
