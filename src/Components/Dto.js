import React from 'react';
import {BaseContext} from './../Context/BaseContext';
import { useContext } from 'react';
import Highlight from 'react-highlight';


const Dto = () => {
          const [state] = useContext(BaseContext);

    return (
    <div className="Left">
      <Highlight className="TypeScript">{state.converted.dto}</Highlight>
    </div>
    );
}

export default Dto;
