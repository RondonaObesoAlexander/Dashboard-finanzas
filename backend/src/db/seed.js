/**
 * db/seed.js
 * Populates the database with realistic sample data for development/demo.
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

process.env.DB_PATH = path.join(__dirname, '../../data/finance.db');

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const { getDb } = require('./schema');
const db = getDb();

const CATEGORIES = {
  expense: ['Housing', 'Food & Dining', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Utilities', 'Education'],
  income:  ['Salary', 'Freelance', 'Investments', 'Other Income'],
};

const DESCRIPTIONS = {
  'Housing':        ['Monthly rent', 'Home insurance', 'Maintenance'],
  'Food & Dining':  ['Grocery store', 'Restaurant lunch', 'Coffee shop', 'Takeout delivery'],
  'Transport':      ['Gas station', 'Uber ride', 'Monthly bus pass', 'Car insurance'],
  'Entertainment':  ['Netflix subscription', 'Cinema tickets', 'Spotify', 'Concert tickets'],
  'Health':         ['Pharmacy', 'Gym membership', 'Doctor visit', 'Vitamins'],
  'Shopping':       ['Amazon order', 'Clothing store', 'Electronics'],
  'Utilities':      ['Electricity bill', 'Internet service', 'Water bill'],
  'Education':      ['Online course', 'Books', 'Udemy subscription'],
  'Salary':         ['Monthly salary'],
  'Freelance':      ['Client project', 'Consulting fee'],
  'Investments':    ['Dividend payment', 'ETF return'],
  'Other Income':   ['Tax refund', 'Birthday gift', 'Sold item online'],
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTransactions(userId, accountIds, months = 12) {
  const transactions = [];
  const now = new Date();

  for (let m = 0; m < months; m++) {
    const year  = now.getFullYear();
    const month = now.getMonth() - m;
    const targetDate = new Date(year, month, 1);

    // Salary (1st of each month)
    transactions.push({
      user_id:     userId,
      account_id:  accountIds[0],
      amount:       4500 + randomBetween(-200, 200),
      type:        'income',
      category:    'Salary',
      description: 'Monthly salary',
      date:        new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)
        .toISOString().split('T')[0],
    });

    // Random expenses (15–25 per month)
    const numExpenses = Math.floor(randomBetween(15, 25));
    for (let i = 0; i < numExpenses; i++) {
      const category = pickRandom(CATEGORIES.expense);
      const day = Math.floor(randomBetween(1, 28));
      const date = new Date(targetDate.getFullYear(), targetDate.getMonth(), day);

      const amountRanges = {
        'Housing':       [900, 1500],
        'Food & Dining': [10, 80],
        'Transport':     [15, 120],
        'Entertainment': [10, 60],
        'Health':        [20, 150],
        'Shopping':      [30, 200],
        'Utilities':     [40, 180],
        'Education':     [15, 100],
      };

      const [min, max] = amountRanges[category];
      transactions.push({
        user_id:     userId,
        account_id:  pickRandom(accountIds),
        amount:       parseFloat(randomBetween(min, max).toFixed(2)),
        type:        'expense',
        category,
        description: pickRandom(DESCRIPTIONS[category]),
        date:        date.toISOString().split('T')[0],
      });
    }

    // Occasional extra income
    if (Math.random() > 0.6) {
      const category = pickRandom(['Freelance', 'Investments', 'Other Income']);
      transactions.push({
        user_id:     userId,
        account_id:  accountIds[0],
        amount:       parseFloat(randomBetween(100, 800).toFixed(2)),
        type:        'income',
        category,
        description: pickRandom(DESCRIPTIONS[category]),
        date:        new Date(targetDate.getFullYear(), targetDate.getMonth(), Math.floor(randomBetween(10, 25)))
          .toISOString().split('T')[0],
      });
    }
  }

  return transactions;
}

function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  db.exec(`
    DELETE FROM refresh_tokens;
    DELETE FROM budgets;
    DELETE FROM transactions;
    DELETE FROM accounts;
    DELETE FROM users;
  `);

  // Create demo user
  const password = bcrypt.hashSync('password123', 10);
  const userId = db.prepare(`
    INSERT INTO users (email, password, name) VALUES (?, ?, ?)
  `).run('demo@example.com', password, 'Alex Morgan').lastInsertRowid;

  // Create accounts
  const insertAccount = db.prepare(`
    INSERT INTO accounts (user_id, name, type, balance) VALUES (?, ?, ?, ?)
  `);

  const checkingId    = insertAccount.run(userId, 'Main Checking', 'checking', 3240.50).lastInsertRowid;
  const savingsId     = insertAccount.run(userId, 'Emergency Fund', 'savings', 12800.00).lastInsertRowid;
  const investmentId  = insertAccount.run(userId, 'Investment Portfolio', 'investment', 28500.00).lastInsertRowid;

  // Generate and insert transactions
  const transactions = generateTransactions(userId, [checkingId, savingsId], 12);
  const insertTx = db.prepare(`
    INSERT INTO transactions (user_id, account_id, amount, type, category, description, date)
    VALUES (@user_id, @account_id, @amount, @type, @category, @description, @date)
  `);

  const insertMany = db.transaction((txs) => {
    for (const tx of txs) insertTx.run(tx);
  });

  insertMany(transactions);

  // Set budget goals
  const insertBudget = db.prepare(`
    INSERT OR REPLACE INTO budgets (user_id, category, monthly_limit) VALUES (?, ?, ?)
  `);

  const budgets = [
    ['Housing', 1400], ['Food & Dining', 400], ['Transport', 200],
    ['Entertainment', 150], ['Health', 200], ['Shopping', 300],
    ['Utilities', 200], ['Education', 100],
  ];

  for (const [category, limit] of budgets) {
    insertBudget.run(userId, category, limit);
  }

  const txCount = db.prepare('SELECT COUNT(*) as c FROM transactions').get().c;
  console.log(`✅ Seeded: 1 user, 3 accounts, ${txCount} transactions, ${budgets.length} budgets`);
  console.log('📧 Login: demo@example.com / password123');
}

seed();
