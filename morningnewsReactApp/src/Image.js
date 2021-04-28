import React, {useState, useEffect} from 'react';
import URL from 'url';

const Image = (props) => {

  const [source, setSource] = useState('/images/default.jpg');

  // Fonction pour tester le status des images
  

  useEffect ( () => {

    async function testImage(url) {
      try {
        // On essaiera XMLHttpRequest....
        var result = await fetch(url, {timeout: 5000});
        console.log('result', result);
        console.log('result.status', result.status);
        if (result.status === 200 || result.status === 304) {
          setSource(url);
        }
      } catch (error) {
        console.log('FETCH-ERROR', error);
        // j'ajoute cette ligne pour bypasser ce composant pour l'instant ::
        setSource(url);
        }
    }
    testImage(props.src);
    // image NOK ::
    // testImage('https://medias.liberation.fr/photo/1375474-2021-02-margueritebornhauser-compiegnes-10jpg.jpg?modified_at=1612265502&amp;picto=fb&amp;ratio_x=191&amp;ratio_y=100&amp;width=1080');
    // image OK ::
    // testImage('https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png');
    // image locale ::
    // testImage('../images/alaska.jpg');
    // simul ::
    // testImage('https://httpstat.us/200')

  }, [] )

  return(
    <img alt=""
      src={source}
    />
  )

}

export default Image;