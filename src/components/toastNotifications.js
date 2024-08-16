/** @format */

import { toast } from "react-toastify";

const notify = (message, options = {}) => {
  const {
    type = "default",
    position = "bottom-right",
    autoClose = 3000,
    theme = "dark",
    transition = "Bounce",
    ...rest
  } = options;

  toast(message, {
    type,
    position,
    autoClose,
    theme,
    transition,
    ...rest,
  });
};

export default notify;
