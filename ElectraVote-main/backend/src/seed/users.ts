// src/seed/users.ts

// Define the UserType interface
type UserType = {
  id: any;
  name: string;
  email: string;
  password: string;
  citizenshipNumber: string;
  admin: boolean;
  verified: boolean;
  aadharNumber: string; // Include the Aadhar number
};

// Create an array of users
const users: UserType[] = [
  {
    name: "John",
    citizenshipNumber: "9860777906",
    email: "john@gmail.com",
    password: "$2b$10$6sdkothEwAguhA0FytsGF.gcWPmTDB5hosif6rGX5FFJK8PdBgRHu",
    admin: true,
    verified: true,
    aadharNumber: "123456789012",
    id: undefined
  },
  {
    name: "Liza",
    citizenshipNumber: "9860777907",
    email: "liza@gmail.com",
    password: "$2b$10$70yLw0dPhAD0py/iiGUInO7kklGUmbMfa5BmXKGCXEID1ufTsqSQ6",
    admin: false,
    verified: true,
    aadharNumber: "234567890123",
    id: undefined
  },
  {
    name: "Ben",
    citizenshipNumber: "9860777908",
    email: "ben@gmail.com",
    password: "$2b$10$1DsQFSqUs3ufyDDRBd9wYuU5i9ihbnYR4GCYJsI3IzGXamwFWnr4S",
    admin: false,
    verified: true,
    aadharNumber: "345678901234",
    id: undefined
  },
];

// Export the users array
export default users;
