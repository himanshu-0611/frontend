export function validate({ user_name, user_mailid, user_password }) {
  let errors = {};

  // Name validation (optional)
  if (!user_name) {
    errors.user_name = "Name is required";
  }

  // Email validation
  if (!user_mailid) {
    errors.user_mailid = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(user_mailid)) {
    errors.user_mailid = "Email address is invalid";
  }

  // Password validation
  if (!user_password) {
    errors.user_password = "Password is required";
  } else if (user_password.length < 3) {
    errors.user_password = "Password must be at least 6 characters long";
  }

  return errors;
}
