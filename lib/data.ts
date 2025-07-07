// user data
const users = [
  {
    name: "Hi-Tech Smart Solution",
    email: "antriatech@gmail.com",
    password: "password",
    image: "/images/users/user-1.jpg",
    token: "asd",
  },
];

export type User = (typeof users)[number];

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};
