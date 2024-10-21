import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [minClose, setMinClose] = useState(120);
  const [minVolume, setMinVolume] = useState(0);

  const filterList = (s) => {
    setSearched(true);
    setFilteredList(
      list &&
        list.filter((item) => {
          let date = item.date.substring(0, 10);
          return date.includes(s);
        })
    );
  };

  const average = () => {
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      sum += list[i].close;
    }
    return sum / list.length;
  };

  const min = () => {
    let min = list[0].low;
    for (let i = 1; i < list.length; i++) {
      if (list[i].low < min) {
        min = list[i].low;
      }
    }
    return min;
  };

  const max = () => {
    let max = list[0].high;
    for (let i = 1; i < list.length; i++) {
      if (list[i].high > max) {
        max = list[i].high;
      }
    }
    return max;
  };

  const today = new Date();
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(today.getDate() - 9);

  const dateTo = today.toLocaleDateString("en-CA");
  const dateFrom = tenDaysAgo.toLocaleDateString("en-CA");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=NVDA&date_from=${dateFrom}&date_to=${dateTo}`
      );
      const data = await response.json();
      setList(data.data);
    };
    fetchData().catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <h2>Nvidia's Stock Price over the Past 10 Days</h2>
      <h3>
        Total number of items in the dataset:
        {list && list.length}
      </h3>
      <h3>Average closing price in recent 10 days: {list && average()}</h3>
      <h3>
        Price range in recent 10 days: {list && min()}-{list && max()}
      </h3>

      <div>
        <input
          type="text"
          placeholder="search date"
          onChange={(e) => filterList(e.target.value)}
        />
        <div>
          <p>min closing price: {minClose}</p>
          <input
            type="range"
            min="120"
            max="140"
            value={minClose}
            step="2"
            onChange={(e) => {
              setMinClose(e.target.value);
              setSearched(true);
              setFilteredList(
                list &&
                  list.filter((item) => {
                    return item.close >= e.target.value;
                  })
              );
            }}
          />
          <p>min volume: {minVolume}</p>
          <input
            type="range"
            min="0"
            max="400000000"
            value={minVolume}
            step="40000000"
            onChange={(e) => {
              setMinVolume(e.target.value);
              setSearched(true);
              setFilteredList(
                list &&
                  list.filter((item) => {
                    return item.volume >= e.target.value;
                  })
              );
            }}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {searched
              ? filteredList &&
                filteredList.map((item) => (
                  <tr key={item.date}>
                    <td>{item.date.substring(0, 10)}</td>
                    <td>{item.open}</td>
                    <td>{item.high}</td>
                    <td>{item.low}</td>
                    <td>{item.close}</td>
                    <td>{item.volume}</td>
                  </tr>
                ))
              : list &&
                list.map((item) => (
                  <tr key={item.date}>
                    <td>{item.date.substring(0, 10)}</td>
                    <td>{item.open}</td>
                    <td>{item.high}</td>
                    <td>{item.low}</td>
                    <td>{item.close}</td>
                    <td>{item.volume}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
