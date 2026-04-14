import ruleRegex from './rules';
import errorMessages from '~/config/error-message.json';

type ValidationResult = string | boolean;
type RuleKey = keyof typeof ruleRegex;
type ValidateValue = string | number | unknown[] | unknown;

const check = {
    /**
     * Check if given string is a phone number
     * @param {string} str Phone number to validate
     */
    phone(str: string): ValidationResult {
        const _phone = str.replace(/[^+\d]/g, '');
        if (!_phone) return errorMessages.validate.phone;
        return this.stringIs(_phone, 'PHONE', errorMessages.validate.phone);
    },
    /**
     * Check if given string is an email
     * @param {string} str Email to validate
     */
    email(str: string): ValidationResult {
        const _email = str.replace(/\s+/g, '');
        return this.stringIs(_email, 'EMAIL', errorMessages.validate.email);
    },
    /**
     * Check if given value exists
     * @param {*} value Value to validate
     * @param {*} except Value to ignore
     */
    required(value: ValidateValue, except: unknown = null): ValidationResult {
        const _value = typeof value === 'string' ? value.trim() : value;
        if (Array.isArray(_value) && _value.length === 0) {
            return errorMessages.validate.required;
        }
        return (except !== null && _value === except) || !!_value || errorMessages.validate.required;
    },
    /**
     * Check if given string is a valid password
     * @param {string} str Password to validate
     * @param {'PASSWORD'|'STRONG_PASSWORD'} rule Rule to validate against, default is 'PASSWORD'
     */
    password(str: string, rule: 'PASSWORD' | 'STRONG_PASSWORD' = 'PASSWORD'): ValidationResult {
        return this.stringIs(str, rule, errorMessages.validate.password);
    },
    ogTitle(str: string): ValidationResult {
        if (typeof str !== 'string') return 'Tiêu đề không hợp lệ';
        if (str.length > 255) return 'Tiêu đề quá dài, tối đa 255 ký tự';
        if (str.length < 10) return 'Tiêu đề quá ngắn, tối thiểu 10 ký tự';
        return true;
    },
    /**
     * Check if given string is a valid short name or slug
     * @param {string} str String to validate
     * @param {'URL'|'SHORT_NAME'|'SLUG'|'COORDINATES'} rule
     */
    stringIs(str: string, rule: RuleKey, errorMessage = 'Định dạng không hợp lệ'): ValidationResult {
        return !str || ruleRegex[rule].test(str) || errorMessage;
    },
    salary(value: number | string, min = 1000): ValidationResult {
        const salary = Number(value);
        return salary > 1000 || `Mức lương phải lớn hơn ${min} đồng`;
    },
    /**
     * Check if given value is greater than or equal to min
     * @param {number|string|array} value Value to validate
     * @param {number} min Minimum value allowed
     * @param {string} errorMessage Custom error message
     */
    min(value: ValidateValue, min: number, errorMessage: string | null = null): ValidationResult {
        if (typeof value === 'string') {
            return value.length >= min || errorMessage || `Độ dài phải lớn hơn hoặc bằng ${min}`;
        }
        if (Array.isArray(value)) {
            return value.length >= min || errorMessage || `Số lượng phải lớn hơn hoặc bằng ${min}`;
        }
        return Number(value) >= min || errorMessage || `Giá trị phải lớn hơn hoặc bằng ${min}`;
    },
    /**
     * Check if given value is less than or equal to max
     * @param {number|string|array} value Value to validate
     * @param {number} max Maximum value allowed
     */
    max(value: ValidateValue, max: number): ValidationResult {
        if (typeof value === 'string') {
            return value.length <= max || `Độ dài phải nhỏ hơn hoặc bằng ${max}`;
        }
        if (Array.isArray(value)) {
            return value.length <= max || `Số lượng phải nhỏ hơn hoặc bằng ${max}`;
        }
        return Number(value) <= max || `Giá trị phải lớn hơn hoặc bằng ${max}`;
    }
};

export default {
    required(except: unknown = null) {
        return (value: ValidateValue) => check.required(value, except);
    },
    email: () => (value: string) => check.email(value),
    phone: () => (value: string) => check.phone(value),
    hotline: () => (value: string) => check.phone(value),
    url: () => (value: string) => check.stringIs(value, 'URL'),
    shortName: () => (value: string) => check.stringIs(value, 'SHORT_NAME'),
    coordinates: () => (value: string) => check.stringIs(value, 'COORDINATES', errorMessages.validate.coordinates),
    password: () => (value: string) => check.password(value, 'PASSWORD'),
    slug: () => (value: string) => check.stringIs(value, 'SLUG'),
    title: () => (value: string) => check.ogTitle(value),
    minQuantity: (length: number) => (value: ValidateValue) => check.min(value, length),
    maxQuantity: (length: number) => (value: ValidateValue) => check.max(value, length),
    maxLength: (length: number) => (value: ValidateValue) => check.max(value, length),
    minLength: (length: number, errorMessage?: string) => (value: ValidateValue) => check.min(value, length, errorMessage ?? null),
    maxSalary: () => (value: number | string) => check.salary(value),
    googleMapPlace: () => (value: string) => check.stringIs(value, 'GOOGLE_MAP_PLACE', errorMessages.validate.googleMapPlace),
};

