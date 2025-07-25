// backend/test/bcryptCheck.js
import bcrypt from 'bcrypt';

const testPassword = 'ModernTech@2025';
const testHash = '$2b$10$9vnSqvbIfZEe3wiWGMeuVuVtmn8PhPedgmmkpBmtgSjgBASV7PZQ6';

bcrypt.compare(testPassword, testHash).then(result => {
  console.log('Standalone bcrypt test:', result); // should print: true
});