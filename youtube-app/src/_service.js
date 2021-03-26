import CryptoJS from 'crypto-js'

export default class YTService {
  users = [
    {
      id: '1j2hg34j23hg42j3',
      email: 'j@gmail.com',
      password: '111111'
    },
    {
      id: '2j4nm4j5hn4j5j45',
      email: 'b@mail.com',
      password: '222222'
    }
  ]

  getItemUser(userData) {
    const user = this.users.find(
      itemUser =>
        itemUser.email === userData.email &&
        itemUser.password === userData.password
    )

    return new Promise((resolve, reject) => {
      if (!user) {
        reject({ message: 'Пользователь не найден' })
      }
      const token = this.generateToken({ id: user.id, email: user.email })
      resolve({ ...user, token })
    })
  }

  generateToken(data) {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    }

    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
    const encodedHeader = this.base64url(stringifiedHeader)

    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
    const encodedData = this.base64url(stringifiedData)

    const token = encodedHeader + '.' + encodedData

    let signature = CryptoJS.HmacSHA256(token, process.env.REACT_APP_SECRET)
    signature = this.base64url(signature)

    return token + '.' + signature
  }

  base64url(source) {
    let encodedSource = CryptoJS.enc.Base64.stringify(source)

    encodedSource = encodedSource.replace(/=+$/, '')
    encodedSource = encodedSource.replace(/\+/g, '-')
    encodedSource = encodedSource.replace(/\//g, '_')

    return encodedSource
  }
}
