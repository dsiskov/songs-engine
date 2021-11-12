// eslint-disable-next-line
export default [
  {
    path: '/',
    component: require('presenters/pages/radio-tracker').default,
    exact: true,
  },
  {
    path: '/login',
    component: require('presenters/pages/login').default,
  },
]
