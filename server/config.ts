import 'dotenv/config'

export default {
  port: process.env.PORT || 9090,
  apiUrl: process.env.API_URL || '',
};