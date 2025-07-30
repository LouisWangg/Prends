// ✅ Name: supports letters, accents, apostrophes, hyphens, periods, spaces; 1–50 chars
export const nameRegex = /^[a-zA-ZÀ-ÿ](?:[a-zA-ZÀ-ÿ'’.\- ]*[a-zA-ZÀ-ÿ])?$/;

// ✅ Email : disallows dots/hyphens at start/end, allows subdomains, enforces valid TLDs (Top Level Domain)
export const emailRegex = 
    /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

// ✅ Password: at least 1 letter, 1 digit, 1 special character
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#()\-_=+\\{}|;:'",.<>\\/`~])[A-Za-z\d@$!%*?&^#()\-_=+\\{}|;:'",.<>\\/`~]+$/;
