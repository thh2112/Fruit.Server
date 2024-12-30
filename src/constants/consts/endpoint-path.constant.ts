export const ENDPOINT_PATH = {
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    BASE: '/auth',
    PROFILE: '/profile',
    CHANGE_AVATAR: '/change-avatar',
    CHANGE_PASSWORD: '/change-password',
    REFRESH_TOKEN: '/refresh',
  },
  USER: {
    BASE: '/user',
  },
  ROLE: {
    BASE: '/role',
  },
  ADMIN: {
    BASE: '/admin',
    ROLE: '/admin/role',
    NEWS: '/admin/news',
    CATEGORY: '/admin/category',
  },
  FILE: {
    BASE: '/file',
    UPLOAD: '/upload',
  },
  PUBLIC: {
    NEWS: '/news',
    CATEGORY: '/category',
  },
};
