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
  pgm.createTable("users", {
    id: { type: "uuid", primaryKey: true },
    email: { type: "text", notNull: true },
    password: { type: "varchar(64)", notNull: true },
    full_name: { type: "varchar(64)" },
    nickname: { type: "varchar(64)" },
    bank_code: { type: "char(3)" },
    bank_account: { type: "varchar(128)" },
    bank_accounts: { type: "varchar(128)[]" },
    degree: { type: "varchar(8)" },
    school: { type: "varchar(16)" },
    department: { type: "varchar(32)" }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("users");
};
