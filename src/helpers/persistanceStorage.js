export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    console.log('Ошибка получения данных из локалстораджа', e)
    return null
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.log('Ошибака сохранения данных в локалсторадж', e)
  }
}