/**
 * An array of routes that are public
 * These routes do not require authentication
 * @type{string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type{string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset-password",
  "/auth/new-password",
  "/auth/reset",
];

/**
 * The prefix for the api routes
 * Routes that start with this prefix will be treated as api routes
 * @type{string}
 */
export const apiAuthPrefix = "api/auth";

/**
 * The default redirect path after a successful login
 * @type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
