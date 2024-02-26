import React, { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#83cfd6');

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5005/quotes")
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const Loading = () => {
    return <div>Loading....</div>;
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * data.length);
  };

  const handleChange = () => {
    setRandomNumber(getRandomNumber());
    setBackgroundColor(getRandomColor());
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: backgroundColor, color: backgroundColor }}>
      <div id='quote-box' style={{ textAlign: 'center', backgroundColor: 'white', height: 'auto', width: '30%', fontSize: '25px', padding: '15px', borderRadius: "7px" }}>
        <div className='quotes' >
          {loading ? (
            <Loading />
          ) : (
            <div>
              {data.length > 0 && (
                <div>
                  <div id='text' style={{ padding: '10px' }}><button className='fa fa-quote-left' style={{ fontSize: "80%", paddingRight: "10px", marginRight: '5px', border: "none", backgroundColor: "white" }}></button>{data[randomNumber].text}</div>
                  <div id='author' style={{ padding: '10px' }} >- {data[randomNumber].author}</div>
                </div>
              )}
            </div>
          )}
        </div >
        <div className='col-3'>
          <a href='twitter.com/intent/tweet' style={{ backgroundColor: backgroundColor, marginBottom: '20px', marginTop: '20px', border: 'none', borderRadius: "2px", padding: '5px', width: "14px", fontSize: "90%" }} target="_blank"><i className='fa fa-twitter' style={{ color: 'white' }}></i></a>

          <a id='tweet-quote' href='twitter.com/intent/tweet' style={{ backgroundColor: backgroundColor, marginBottom: '20px', marginLeft: '30px', marginTop: '20px', border: 'none', borderRadius: "2px", padding: '5px', paddingRight: '10px', paddingLeft: '10px', fontSize: "90%" }} target="_blank"><i className='fa fa-tumblr' style={{ color: 'white' }}></i></a>

          <button id='new-quote' style={{ backgroundColor: backgroundColor, marginBottom: '20px', marginLeft: '180px', marginTop: '20px', padding: "8px", border: 'none', borderRadius: "2px", color: 'white' }} onClick={handleChange}>New Quote</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
