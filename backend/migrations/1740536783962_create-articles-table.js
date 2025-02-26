/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("articles", {
    id: { type: "uuid", primaryKey: true },
    user_id: { type: "uuid", notNull: true, references: '"users"' },
    company_name: { type: "text" },
    job_type: { type: "varchar(2)" },
    is_public_education: { type: "boolean" },
    years_experience: { type: "integer" },
    years_at_company: { type: "integer" },
    monthly_salary: { type: "integer" },
    daily_salary: { type: "integer" },
    hourly_salary: { type: "integer" },
    annual_bonus: { type: "integer" },
    profit_sharing: { type: "integer" },
    three_festivals_bonus: { type: "integer" },
    other_allowances: { type: "integer" },
    working_days_per_month: { type: "integer" },
    work_hours_per_day: { type: "integer" },
    health_check: { type: "boolean" },
    training: { type: "boolean" },
    meal_allowance: { type: "boolean" },
    housing_allowance: { type: "boolean" },
    transportation_allowance: { type: "boolean" },
    travel_allowance: { type: "boolean" },
    wedding_allowance: { type: "boolean" },
    maternity_allowance: { type: "boolean" },
    snack_afternoon_tea: { type: "boolean" },
    entertainment_fitness: { type: "boolean" },
    staff_travel: { type: "boolean" },
    article_content: { type: "text" },
    salary: { type: "integer" },
    comfort_level: { type: "integer" },
    growth_potential: { type: "integer" },
    custom_price: { type: "integer" }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("articles");
};
