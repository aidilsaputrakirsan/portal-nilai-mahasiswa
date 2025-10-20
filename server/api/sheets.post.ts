export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const gasUrl = 'https://script.google.com/macros/s/AKfycbyQGFtDE9jApsyuNnj0LGpAHMEhniFlACEBpElDKeVCgLrhkPognvuy_1Ea_ZO08cyK5g/exec'
    
    console.log('Forwarding request to GAS:', { spreadsheetId: body.spreadsheetId, sheetName: body.sheetName })
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      redirect: 'follow'
    })
    
    console.log('GAS Response Status:', response.status)
    
    const responseText = await response.text()
    console.log('GAS Response:', responseText.substring(0, 200))
    
    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse GAS response:', e)
      responseData = {
        success: false,
        message: 'Invalid response from GAS',
        rawResponse: responseText.substring(0, 200)
      }
    }
    
    return responseData
    
  } catch (error) {
    console.error('API Route Error:', error)
    return {
      success: false,
      message: 'Error di API Route: ' + (error as Error).message
    }
  }
})