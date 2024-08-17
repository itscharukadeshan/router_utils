/** @format */

import { toast } from "react-toastify";

const displayedNotifications = new Set();

const notify = (message, options = {}) => {
  const {
    type = "default",
    position = "bottom-right",
    autoClose = 3000,
    theme = "dark",
    transition = "Bounce",
    ...rest
  } = options;

  if (!displayedNotifications.has(message)) {
    toast(message, {
      type,
      position,
      autoClose,
      theme,
      transition,
      ...rest,
    });

    displayedNotifications.add(message);
  }
};

export default notify;
