
import UserDao from "../daos/users.dao.js";
import UserRepository from "./UserRepository.js";


export const usersService = new UserRepository(new UserDao());
