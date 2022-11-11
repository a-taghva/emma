const { schema, model, Types, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeeSchema = new schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!']
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  adminID: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
});

// set up pre-save middleware to create password
EmployeeSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
EmployeeSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};


const Employee = model('User', EmployeeSchema);

module.exports = Employee;