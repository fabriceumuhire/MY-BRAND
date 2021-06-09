import bcrypt from 'bcryptjs';

export const newUser = {
  name: 'Sys Admin',
  email: 'sysadm@hello.com',
  password: '12ggdsce',
};
export const wrongUser = {
  name: 'Sys Admin7',
  email: 'adminsysadm5hello.com',
  password: '12ggdsce',
};
export const wrongPass = {
  name: 'Sys Admin7',
  email: 'adminsysadm5hello.com',
  password: '12ggr',
};

export const logginUser = {
  name: 'Test Loggin',
  email: 'test@login.rw',
  password: bcrypt.hashSync('Test1234', 10),
};

export const mockUser = {
  email: logginUser.email,
  password: logginUser.password,
};
