export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  const fullPath = route.fullPath
  const locale = app.i18n.locale
  if(fullPath.indexOf('/'+locale+'/') !== 0) {
    redirect('/'+locale+fullPath)
  }
}
