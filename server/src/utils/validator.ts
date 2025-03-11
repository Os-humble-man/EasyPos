import Joi from "joi";
import { User } from "../repository/UserRepository";
import { Task } from "../repository/TaskRepository";

export const validateUser = (data: User) => {
  const schema = Joi.object({
    id: Joi.optional(),
    username: Joi.string().min(3).max(30).required().messages({
      "string.base": `username should be a type of 'text'`,
      "string.empty": `username cannot be an empty field`,
      "string.min": `username should have a minimum length of {#limit}`,
      "string.max": `username should have a maximum length of {#limit}`,
    }),
    departmentId: Joi.string().required().messages({
      "any.required": `departmentId is a required field`,
    }),
    password: Joi.string().min(6).max(32).required().messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": `password should have a minimum length of {#limit}`,
      "string.max": `password should have a maximum length of {#limit}`,
    }),
  });
  return schema.validate(data);
};

export const validateLogin = (data: { username: string; password: string }) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      "string.base": `username should be a type of 'text'`,
      "string.empty": `username cannot be an empty field`,
      "string.min": `username should have a minimum length of {#limit}`,
      "string.max": `username should have a maximum length of {#limit}`,
    }),
    password: Joi.string().min(6).max(32).required().messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": `password should have a minimum length of {#limit}`,
      "string.max": `password should have a maximum length of {#limit}`,
    }),
  });
  return schema.validate(data);
};

export const validateTask = (data: Task) => {
  const schema = Joi.object({
    id: Joi.optional(),
    title: Joi.string().min(3).max(30).required().messages({
      "string.base": `title should be a type of 'text'`,
      "string.empty": `title cannot be an empty field`,
      "string.min": `title should have a minimum length of {#limit}`,
      "string.max": `title should have a maximum length of {#limit}`,
    }),
    status: Joi.optional(),
    project: Joi.string().required().messages({
      "string.base": `project should be a type of 'text'`,
      "string.empty": `project cannot be an empty field`,
    }),
    estimatedTime: Joi.string().required().messages({
      "string.base": `estimatedTime should be a type of 'text'`,
      "string.empty": `estimatedTime cannot be an empty field`,
    }),
    assignTo: Joi.string().required().messages({
      "string.base": `assignTo should be a type of 'text'`,
      "string.empty": `assignTo cannot be an empty field`,
    }),
  });
  return schema.validate(data);
};
