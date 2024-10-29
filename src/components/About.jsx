import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const About = () => {
  const params = useParams();
  const [fullData, setFullData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://api.marketstack.com/v1/eod/${params.date}?access_key=${API_KEY}&symbols=NVDA`
      );
      const data = await response.json();
      setFullData(data.data);
    };
    fetchData().catch(console.error);
  }, [params.date]);

  return (
    <div>
      {fullData &&
        fullData.map((item) => (
          <div>
            <p>date: {item.date.substring(0, 10)}</p>
            <p>raw opening price: {item.open}</p>
            <p>raw closing price: {item.close}</p>
            <p>raw high price: {item.high}</p>
            <p>raw low price: {item.low}</p>
            <p>volume: {item.volume}</p>
            <p>adjusted opening price: {item.adj_open}</p>
            <p>adjusted high price: {item.adj_high}</p>
            <p>adjusted low price: {item.adj_low}</p>
            <p>adjusted closing price: {item.adj_close}</p>
            <p>adjusted volume: {item.adj_volume}</p>
          </div>
        ))}
    </div>
  );
};

export default About;
