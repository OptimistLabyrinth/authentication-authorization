/* eslint-disable no-undef */
db.createUser(
  {
    user: 'normal_user',
    pwd: 'normal_pwd_crypt',
    roles: [
      {
        role: 'dbOwner',
        db: 'my_service',
      },
    ],
  },
)

// db.createCollection('students');

// db.students.insertMany([
//     {
//         name: 'AAA',
//         email: 'aaa-01@student.com',
//     },
//     {
//         name: 'BBB',
//         email: 'bbb-02@student.com',
//     },
//     {
//         name: 'CCC',
//         email: 'ccc-03@student.com',
//     },
// ]);
