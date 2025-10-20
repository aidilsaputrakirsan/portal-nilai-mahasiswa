export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { mkCode, password } = body
    
    // DEBUG: Log mkCode yang diterima
    console.log('DEBUG - mkCode received:', mkCode)
    console.log('DEBUG - password received:', password)
    
    const config = useRuntimeConfig(event)
    
    // DEBUG: Log config
    console.log('DEBUG - config.mkPm:', config.mkPm)
    console.log('DEBUG - config.mkKka:', config.mkKka)
    
    // Mapping mkCode ke config key
    const mkMap = {
      'pm': config.mkPm,
      'kka': config.mkKka,
      'kkb': config.mkKkb,
      'dmjk': config.mkDmjk
    }
    
    const mkData = mkMap[mkCode as keyof typeof mkMap]
    
    console.log('DEBUG - mkData:', mkData)
    
    if (!mkData) {
      return { success: false, message: 'MK tidak valid' }
    }
    
    // Split password dan spreadsheetId
    const [correctPassword, spreadsheetId] = mkData.split(':')
    
    if (!correctPassword) {
      return { success: false, message: 'MK belum dikonfigurasi' }
    }
    
    // Validasi password
    if (password === correctPassword) {
      return {
        success: true,
        message: 'Password benar',
        spreadsheetId: spreadsheetId || ''
      }
    } else {
      return { success: false, message: 'Password salah' }
    }
    
  } catch (error) {
    console.error('Validate Password Error:', error)
    return { success: false, message: 'Error validasi password' }
  }
})