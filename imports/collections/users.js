import { Mongo } from 'meteor/mongo'

Users = [(
  username: "Admin",
  email: "admin@test.com",
  password: "password",
  profiles: { name: "Big Admin" },
  roles: ["Administrator"]
)]

export const Users = new Mongo.Collection('users')
