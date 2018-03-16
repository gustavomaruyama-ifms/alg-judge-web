import lazyLoading from './lazyLoading'

export default {
  name: 'Problema',
  path: '/problema',
  user: 'Administrador',
  component: lazyLoading('problema/Problema'),
  meta: {
    default: true,
    title: 'Problema',
    iconClass: 'fa fa-coffee'
  }
}
