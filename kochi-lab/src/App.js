import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.AFRAME) {
      window.AFRAME.registerComponent('videohandler', {
        init: function () {
          var marker = this.el;
          this.vid = document.querySelector("#vid");

          marker.addEventListener('markerFound', function () {
            this.vid.play();
          }.bind(this));

          marker.addEventListener('markerLost', function() {
            this.vid.pause();
            this.vid.currentTime = 0;
          }.bind(this));
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <div style={{margin: '0px', overflow: 'hidden'}}>
        <div style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            textAlign: 'center',
            fontSize: '1.25em',
            color: 'white'
          }}>
            Loading, please wait...
          </div>
        </div>
        
        <a-scene
          vr-mode-ui="enabled: false;"
          renderer='antialias: true; alpha: true; precision: medium;'
          embedded arjs='trackingMethod: best; sourceType: webcam; debugUIEnabled: false;'
        >
          <a-assets>
            <video 
              src="kochi-lab/src/img/MRT-Putrajaya-Line.jpg"
              preload="auto" 
              id="vid" 
              response-type="arraybuffer" 
              loop
              crossOrigin="true"
              webkit-playsinline="true"
              autoPlay 
              muted 
              playsInline
            />
          </a-assets>

          <a-nft
            videohandler 
            type='nft' 
            url="https://raw.githubusercontent.com/lowwengshan/KochiLab/main/asset/markers/MRT/MRT-logo.fset"            
            smooth="true" 
            smoothCount="10" 
            smoothTolerance="0.01" 
            smoothThreshold="5"
          >
            <a-video
              src="#vid"
              position='50 150 -100'
              rotation='90 0 180'
              width='300'
              height='175'
            />
          </a-nft>
          <a-entity camera></a-entity>
        </a-scene>
      </div>
    </div>
  );
}

export default App;