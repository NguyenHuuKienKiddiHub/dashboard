/* eslint-disable no-useless-escape */
import phonePrefixes from '~/config/phone-prefix.json';

const PHONE = new RegExp(
    `^([0]{1}|\\+84)(${phonePrefixes.join('|')})([0-9]{7})$`
);
const CONTAINS_EMOJI = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
const HOTLINE = /(((\+|)84)|0)+([0-9]{9}|[0-9]{10})\b/;
const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL = /https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/;
const SHORT_NAME = /^[a-z]+(-[a-z]+)*$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
/**
 * dd/mm/yyyy or dd-mm-yyyy
 */
const DATE = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
const COORDINATES = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
/**
 * mm/yyyy or mm-yyyy
 */
const MONTH = /^(0?[1-9]|1[012])[\/\-](\d{4}|\d{2})$/;
/**
 * Password must have at least 8 characters include one digit, one lower case, one upper case
 */
const PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
/**
 * Strong password must have at least 8 characters include one digit, one lower case, one upper case and one special character
 */
const STRONG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/

const GOOGLE_MAP_PLACE = /^https?:\/\/(www\.)?google\.com\/maps\/(place\/[^\/]+\/)?@-?\d+\.?\d*,-?\d+\.?\d*,\d+\.?\d*z/

export default {
    CONTAINS_EMOJI,
    PHONE,
    HOTLINE,
    EMAIL,
    URL,
    DATE,
    MONTH,
    PASSWORD,
    SHORT_NAME,
    COORDINATES,
    SLUG,
    STRONG_PASSWORD,
    GOOGLE_MAP_PLACE
};
