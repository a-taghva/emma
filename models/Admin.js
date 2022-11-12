const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!']
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

// set up pre-save middleware to create password
AdminSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
AdminSchema.methods.isCorrectPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
};


const Admin = model('Admin', AdminSchema);

module.exports = Admin;