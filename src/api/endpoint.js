const endpoints = {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password'
    },
    courses: {
      list: '/courses',
      details: (id) => `/courses/${id}`,
      enroll: (id) => `/courses/${id}/enroll`,
      progress: (id) => `/courses/${id}/progress`
    },
    dashboard: {
      student: '/dashboard/student',
      teacher: '/dashboard/teacher',
      admin: '/dashboard/admin'
    },
    users: {
      profile: '/users/profile',
      updateProfile: '/users/profile/update'
    }
  };
  
  export default endpoints;