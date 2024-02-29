import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import serviceData from './services.json';
import './servicebot.css';


function Servicebot(){
    const [basename, setBasename] = useState("");
    const [serviceState, setServiceState] = useState(false);
    const faqData = serviceData.DEservices;
    
    var snippet = <></>;
    var returnValue = <></>;

    function contentSwitcher(name){
      let existingItem = faqData.find(item => item.name === name);
      if(existingItem){
        setBasename(existingItem.name);
      }
    }

    
    
    if(serviceState === false){
      snippet = <div className="service-main"><button className="service-bot-unused" onClick={() => setServiceState(true)}>Hilfe anzeigen</button></div>;
      returnValue = snippet;
    }else{
      if (basename === ""){
        snippet = 
        <>
          <div>Mit welchem Thema benötigen Sie hilfe?</div>
          {faqData.map(theme => <button onClick={() => contentSwitcher(theme.name)}>{theme.name}</button>)}
          <button className="service-bot-inuse" onClick={() => setServiceState(false)}>Hilfe ausblenden</button>
        </>;

      }else{
        let usedService = faqData.find(item => item.name === basename);
        let serviceToMap = usedService.werte;

        snippet= 
        <>
          <button style={{fontSize: "14px"}} onClick={() => setBasename("")}>
          <svg style={{width: "15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path d="M512 0C229.216 0 0 229.232 0 512c0 282.784 229.216 512 512 512 282.768 0 512-229.216 512-512C1024 229.232 794.768 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01 0-247.024 200.976-448 448-448s448 200.977 448 448-200.976 449.01-448 449.01zm224.32-481.344H375.856l115.76-115.76c12.496-12.496 12.496-32.752 0-45.248s-32.752-12.496-45.248 0l-189.008 194 189.008 194c6.256 6.256 14.432 9.376 22.624 9.376s16.368-3.12 22.624-9.376c12.496-12.496 12.496-32.752 0-45.248l-117.76-117.744H736.32c17.68 0 32-14.336 32-32s-14.32-32-32-32z"/></svg>
          zurück</button>
          <div className="service-bot-texts">
          <h5>{usedService.name}</h5>
          <h6>{usedService.text}</h6>
          {serviceToMap.map(
            (service) => <><h6>{service.name}</h6><p>{service.wert}</p></>
          )
          }</div>
          <button className="service-bot-inuse" onClick={() => setServiceState(false)}>Hilfe ausblenden</button>
        </>;
      }

      returnValue = <div className="service-main"><div className="service-bot">{snippet}</div></div>;
    }

    return (returnValue);
    
  };



  export default Servicebot;