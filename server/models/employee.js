const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const employeeSchema = new Schema({
  username: {
    type: String, 
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  },
});

employeeSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

employeeSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const Employee = model('Employee', employeeSchema);

module.exports = Employee;