import axios from 'axios'

const apiKey = 'r6Bx1dwkOyRDdfUqVAGmeGINYTLFDU7KNsXeQEd4'
const URL = `https://api.currencyapi.com/v3/latest?base_currency=USD&apikey=${apiKey}`
const valueBase = {
  GTQ: {
    value: 7.84
  },
  EUR: {
    value: 0.91
  }
}

export const getDivisas = async () => {
  try {
    const data = await axios.get(URL)
    // const a = data.data.data.GTQ.value
    const a = data.data.data
    return a
  } catch (error) {
    console.log(error)
    // En caso se llegue al limite de peticiones del API de divisas, se retorna un valor base
    return valueBase
  }
}

export const prinHola = (a) => {
  return a
}
