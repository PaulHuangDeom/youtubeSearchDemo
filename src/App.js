import React, {useState, useEffect} from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './App.css';
const App = () => {
  const [searchVal, setSearchVal] = useState("");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupCount] = useState(6);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    if(items.length === 0) getDate();
    setTotalPage(items.length / groupCount);
  });
  const getDate = () => {
    axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        key: "YOUR_API_KEY",
        part: "snippet",
        type: "video",
        maxResults: 18,
        q: searchVal
      }
    })
    .then(res => setItems(res.data.items))
  };
  const renderItem = (item) => {
    const title = item.snippet.title;
    const videoId = item.id.videoId;
    const imgUrl = item.snippet.thumbnails.medium.url;
    return (
      <li className="ytb_item" key={videoId}>
        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
          <img src={imgUrl}/>
          <h2>{title}</h2>
        </a>
      </li>
    )
  };
  const filterItem = (items) => {
    const maxCunt = (groupCount * currentPage);
    const minCunt = maxCunt - groupCount;
    return items.filter((item, index) => index >= minCunt && index <= maxCunt - 1);
  };
  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="search_block">
            <input type="text" className="search" value={searchVal} onChange={(e) => setSearchVal(e.target.value)}/>
            <button className="search_btn" onClick={() => setItems([])}><FontAwesomeIcon icon={faSearch} /></button>
          </div>
        </div>
      </header>
      <section>
        <ul className="ytb_lists container">
          {filterItem(items).map(item => renderItem(item))}
        </ul>
        <div className="pages">
          {Array.from({length: totalPage}, (v, i) => i+1).map(item => <span key={`page_num_${item}`} className={[currentPage === item ? "page_num active" : "page_num"]} onClick={() => setCurrentPage(item)}>{item}</span>)}
        </div>
      </section>
    </div>
  );
};

export default App;
