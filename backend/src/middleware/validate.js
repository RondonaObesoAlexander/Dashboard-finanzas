

const { z } = require('zod');

/**
 * Higher-order middleware factory.
 * Usage: router.post('/path', validate(MySchema), handler)
 *
 * @param {z.ZodSchema} schema - Zod schema to validate req.body against
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(400).json({ error: 'Validation failed', errors });
    }

    req.body = result.data;  // Replace with parsed + coerced values
    next();
  };
}

// ── Schemas ─────────────────────────────────────────────────────────────────

const RegisterSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name:     z.string().min(1).max(100),
});

const LoginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
});

const TransactionSchema = z.object({
  account_id:  z.number().int().positive(),
  amount:      z.number().positive('Amount must be positive'),
  type:        z.enum(['income', 'expense']),
  category:    z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  date:        z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
});

const BudgetSchema = z.object({
  monthly_limit: z.number().positive(),
});

module.exports = {
  validate,
  RegisterSchema,
  LoginSchema,
  TransactionSchema,
  BudgetSchema,
};
