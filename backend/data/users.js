import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin", 10),
  },
  {
    name: "Puneeth P",
    email: "puneeth@example.com",
    password: bcrypt.hashSync("puneeth", 10),
  },
  {
    name: "Madhu M",
    email: "madhu@example.com",
    password: bcrypt.hashSync("madhu", 10),
  },
];

export default users;
