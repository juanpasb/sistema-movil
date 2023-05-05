import { validation } from "../element/validationForm";

export const error = (err: any) => {
  switch (err.response.status) {
    case 403:
      window.location.href = "/security";
      break;
    case 404:
      window.location.href = "/404";
      break;
    case 401:
      window.location.href = "/security";
      break;
    case 400:
      if (err.response.data.details !== undefined) {
        validation(err.response.data.details);
      }
      break;
  }
  return err;
};