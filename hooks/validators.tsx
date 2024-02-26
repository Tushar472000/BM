export const cleanString = (input: string) => {
  const result = input?.replace(/\s/g, '');
  return result;
};
export function validateEmail(email: string) {
  if (cleanString(email)?.length <= 0) {
    return 0;
  } else {
    return /^([a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*)@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|([a-zA-Z0-9-]+\.[a-zA-Z0-9-]+))$/.test(email);
  }
}

export function validateName(name: string) {
  if (name !== null || name !== undefined) {
    if (cleanString(name)?.length <= 0) {
      return 0;
    } else {
      return /^[a-zA-Z\s]+$/.test(name);
    }
  } else {
    return false;
  }
}

export function validatePin(pincode: string): any {
  if (cleanString(pincode)?.length <= 0) {
    return 0;
  } else {
    return /^\d{5}(?:-\d{4})?$/.test(pincode);
  }
}

export function validateInput(input: string) {
  if (input !== undefined || input !== null) {
    if (cleanString(input)?.length <= 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export function validatePassword(input: string | any) {
  const validRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
  if (cleanString(input)?.length === 0) {
    return 0;
  } else if (cleanString(input)?.length < 8 || !input.match(validRegex)) {
    return false;
  } else {
    return true;
  }
}

export function validateAccountDetails(
  name: string,
  streetAddress: string,
  state: string,
  city: string,
  pincode: string
) {
  if (
    validateName(name) === 0 ||
    validateName(name) === false ||
    validateInput(streetAddress) === false ||
    streetAddress.length > 50 ||
    validateName(state) === 0 ||
    validateName(state) === false ||
    validateName(city) === 0 ||
    validateName(city) === false ||
    validatePin(pincode) === 0 ||
    validatePin(pincode) === false
  ) {
    return false;
  } else {
    return true;
  }
}

export function validateCreateAccount(
  name: string,
  email: string,
  password: string
) {
  if (
    validateName(name) === 0 ||
    validateName(name) === false ||
    validateEmail(email) === 0 ||
    validateEmail(email) === false ||
    validatePassword(password) === 0 ||
    validatePassword(password) === false
  ) {
    return false;
  } else {
    return true;
  }
}
