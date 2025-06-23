// user data
const users = [
  {
    name: "AntriTagih",
    email: "dashcode@codeshaper.net",
    password: "password",
    image: "/images/users/user-1.jpg",
    token: "asd",
  },
];

export type User = (typeof users)[number];

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};
