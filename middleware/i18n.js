export default async function ({ isHMR, app, store, route, params, error, redirect }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) { return }
  const locale = params.lang
  store.commit('i18n/initLocale', locale)

  const fullPath = route.fullPath
  const nowLocale = store.getters['i18n/locale']
  if (fullPath.indexOf('/' + nowLocale + '/') !== 0) {
    redirect('/' + nowLocale + fullPath)
    return
  }
  await app.loadlLocale(nowLocale)

}
