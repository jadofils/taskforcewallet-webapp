const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
userSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});
const User = mongoose.model('User', userSchema);

// Account Schema
const accountSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    account_name: { type: String, required: true },
    account_type: { type: String, enum: ['Bank', 'Mobile Money'], required: true },
    balance: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const Account = mongoose.model('Account', accountSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const Category = mongoose.model('Category', categorySchema);

// Subcategory Schema
const subcategorySchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const Subcategory = mongoose.model('Subcategory', subcategorySchema);

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true },
    transaction_type: { type: String, enum: ['Income', 'Expense'], required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const Transaction = mongoose.model('Transaction', transactionSchema);

// Budget Schema
const budgetSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    amount_limit: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
const Budget = mongoose.model('Budget', budgetSchema);

// Report Schema
const reportSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    generated_at: { type: Date, default: Date.now },
});
const Report = mongoose.model('Report', reportSchema);

// Export all models as an object
module.exports = {
    User,
    Account,
    Category,
    Subcategory,
    Transaction,
    Budget,
    Report,
};
