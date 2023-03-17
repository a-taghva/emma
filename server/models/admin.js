const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee'
    }
  ]
});

adminSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
})

adminSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

const Admin = model('Admin', adminSchema);

module.exports = Admin;