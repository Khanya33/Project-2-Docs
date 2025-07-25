// backend/test/hashGenerator.js
// import bcrypt from 'bcrypt';

// const rawPassword = 'ModernTech@2025';
// const saltRounds = 10;

// bcrypt.hash(rawPassword, saltRounds).then(hash => {
//   console.log('Generated hash:', hash);
// });

import bcrypt from 'bcrypt';

const saltRounds = 10;

const employees = [
  { id: 4, password: 'Modern@4' },
  { id: 5, password: 'Modern@4' },
];

employees.forEach((emp) => {
  bcrypt.hash(emp.password, saltRounds)
    .then((hashed) => {
      console.log(`ID: ${emp.id}, Hashed: ${hashed}`);
      // Optional: update your DB here
    })
    .catch((err) => {
      console.error(`Hashing failed for ID ${emp.id}:`, err);
    });
});