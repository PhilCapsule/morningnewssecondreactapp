import React, {useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import {Link} from 'react-router-dom';

const newsapiKey = "de4ba293118540bda929cebbbdceab1b";

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([]);

  useEffect( () => {
    const getSourceList = async () => {
      const rawResponse = await fetch(`https://newsapi.org/v2/sources?language=fr&country=fr&apiKey=${newsapiKey}`);
      const response = await rawResponse.json();
      setSourceList(response.sources);
    }
    getSourceList();
  }, []);

  return (
    <div>
        <Nav/>
       
       <div className="Banner"/>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="../images/banner.png" />}
                        title={<Link to={`/screenarticlesbysource/${item.id}`}>{item.name}</Link>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

export default ScreenSource;
