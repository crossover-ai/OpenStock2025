const axios = require('axios');

exports.handler = async (event) => {
  try {
    // 从环境变量读取API Key
    const API_KEY = process.env.ALPHA_VANTAGE_KEY;
    const symbol = event.queryStringParameters.symbol || 'AAPL'; // 默认展示苹果股票

    // 调用Alpha Vantage API
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    );

    // 数据格式转换
    const rawData = response.data['Time Series (Daily)'];
    const data = Object.entries(rawData).map(([date, values]) => ({
      date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close'])
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '服务器错误' })
    };
  }
};