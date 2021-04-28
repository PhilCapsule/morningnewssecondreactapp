import React, {useState, useEffect} from 'react';
import './App.css';
import { Card, Icon, Row, Col, Modal} from 'antd';
import Nav from './Nav'
import {useParams} from 'react-router-dom';

import Image from './Image';

const { Meta } = Card;
const newsapiKey = "de4ba293118540bda929cebbbdceab1b";

function ScreenArticlesBySource(props) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  let {id} = useParams();

  const [articleList, setArticleList] = useState([]);
  // Variables pour le contenu de la modale :
  const [articleTitle, setArticleTitle] = useState("");
  const [articleUrlToImage, setArticleUrlToImage] = useState("");
  const [articlePublishedAt, setArticlePublishedAt] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleUrl, setArticleUrl] = useState("");

  useEffect ( () => {
    const getArticlesBySource = async () => {
      const rawResponse = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${newsapiKey}`);
      const response = await rawResponse.json();
      // console.log('response.articles', response.articles);
      setArticleList(response.articles);
    }
    getArticlesBySource();
  }, [])

  // console.log('articleList', articleList)

  // On remplit la liste des articles

  const showModal = (title, url2img, pubat, desc, url) => {
    setIsModalVisible(true);
    setArticleTitle(title);
    setArticleUrlToImage(url2img);
    setArticlePublishedAt(pubat);
    setArticleDescription(desc);
    setArticleUrl(url);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // On tronque les descriptions
  function truncateString(str) {
    if (str !== null && str.length >100) {
      return str.slice(0, 100)+"...";
    } else {
      return str;
    }
  }

  var articleCards = articleList.map((article, i) => {
    return(
      <Col key={i} className="gutter-row" xs={24} sm={12} md={8} lg={6}>
        <Card
          style={{ 
          width: 300, 
          height:'100%',
          margin:'15px', 
          display:'flex',
          flexDirection: 'column',
          justifyContent:'space-between' }}
          cover={
            <Image
            src={article.urlToImage}
            />
          }
          actions={[
              <Icon type="read" key="ellipsis2" onClick={ ()=>showModal(article.title, article.urlToImage, article.publishedAt, article.description, article.url) }/>,
              <Icon type="like" key="ellipsis"/>,
          ]}
          >
          <Meta
            title={article.title}
            description={truncateString(article.content)}
          />
        </Card>
        <Modal title={articleTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
          <img src={articleUrlToImage} style={{width:'100%', marginBottom:10}}/>
          <h5>Publié le : {articlePublishedAt}</h5>
          <p>{articleDescription}</p>
          <a href={articleUrl}>Lire plus sur le site</a>
        </Modal>
      </Col>
      
    );
  })

  return (
    <div>
      <Nav/>
      <div className="Banner"/>
      <div className="Card">
        <Row gutter={16, 16} type='flex' justify="space-around" align="middle" >
            {articleCards}
        </Row>
      </div> 
    </div>
  );
}

export default ScreenArticlesBySource;
