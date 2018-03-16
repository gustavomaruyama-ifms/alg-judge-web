import lazyLoading from './lazyLoading'

export default {
  name: 'Profile',
  path: '/profile',
  component: lazyLoading('profile/Usuario'),
  meta: {
    default: true,
    title: 'Profile',
    iconClass: 'vuestic-icon vuestic-icon-user'
  }
}
