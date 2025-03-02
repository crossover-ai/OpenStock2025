import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

function App() {
  const [option, setOption] = useState({});

  // 获取K线数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/.netlify/functions/fetchStockData');
        const data = response.data;

        setOption({
          xAxis: { type: 'time' },
          yAxis: { type: 'value', scale: true },
          series: [{
            type: 'candlestick',
            data: data.map(item => [
              item.date, // 日期（格式：'2023-10-01'）
              item.open, // 开盘价
              item.close, // 收盘价
              item.low,   // 最低价
              item.high   // 最高价
            ])
          }]
        });
      } catch (error) {
        console.error('数据获取失败:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>AAPL 股票K线图（密码：123）</h1>
      <ReactECharts
        option={option}
        style={{ height: '600px', width: '100%' }}
      />
    </div>
  );
}

export default App;