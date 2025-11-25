const BASE_URL = 'http://localhost:3000'

async function verifyAuth() {
  console.log('Starting Auth Verification...')

  // Test 1: Create Product without Auth
  try {
    console.log('Test 1: Create Product without Auth')
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Hacker Product',
        price: 0,
        description: 'Hacked',
        category: 'men',
        stock: 100,
        images: []
      })
    })

    if (response.ok) {
      console.error('FAILED: Product creation should have failed. Status:', response.status)
    } else {
      console.log('PASSED: Product creation blocked with', response.status)
    }
  } catch (error: any) {
    console.error('FAILED: Unexpected error', error)
  }

  // Test 2: Upload Image without Auth
  try {
    console.log('\nTest 2: Upload Image without Auth')
    const formData = new FormData()
    const blob = new Blob(['fake image content'], { type: 'image/png' })
    formData.append('file', blob, 'hacker.png')

    const response = await fetch(`${BASE_URL}/api/upload/image`, {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      console.error('FAILED: Image upload should have failed. Status:', response.status)
    } else {
      console.log('PASSED: Image upload blocked with', response.status)
    }
  } catch (error: any) {
    console.error('FAILED: Unexpected error', error)
  }
}

verifyAuth()
