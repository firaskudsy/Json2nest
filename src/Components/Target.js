import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import {BaseContext} from './../Context/BaseContext';
import {useContext, useEffect} from 'react';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Schema from './Schema';
import Interface from './Interface';

import Dto from './Dto';

const Target = () => {
  const [state, setState] = useContext(BaseContext);
  const convert = () => {
    let _name = state.name.charAt(0).toUpperCase() + state.name.slice(1);

    let _jsonObj = JSON.parse(state.json);
    let _jsonArr = Object.entries(_jsonObj);
    let _schema = `import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ${_name} extends Document {

${_jsonArr
  .map((value) => {
    return `@Prop()
${value[0]}: ${typeof value[1]};
`;
  })
  .join('\n')}
}
export const ${_name}Schema = SchemaFactory.createForClass(${_name});`;

    let _dto = `import * as mongoose from 'mongoose'
import { ApiProperty } from '@nestjs/swagger';

export class Create${_name}Dto {

@ApiProperty()
readonly _id: mongoose.Types.ObjectId;

${_jsonArr
  .map((value) => {
    return `@ApiProperty()
readonly ${value[0]}: ${typeof value[1]};
`;
  })
  .join('\n')}
}`;

    let _interface = `export class ${_name} {

${_jsonArr
  .map((value) => {
    return `${value[0]}: ${typeof value[1]};
`;
  })
  .join('\n')}
}`;

    setState({...state, converted: {schema: _schema, dto: _dto, interface: _interface}});
  };
  return (
    <div className="Target__body">
      {state.valueChecks.schema}
      <div className="Target__selector">
        <FormControlLabel
          value="schema"
          control={
            <Checkbox
              color="primary"
              onChange={(event) =>
                setState({...state, valueChecks: {schema: event.target.checked, interface: state.valueChecks.interface, dto: state.valueChecks.dto}})
              }
            />
          }
          label="Schema"
          labelPlacement="start"
        />
        <FormControlLabel
          value="interface"
          control={
            <Checkbox
              color="primary"
              onChange={(event) =>
                setState({...state, valueChecks: {interface: event.target.checked, schema: state.valueChecks.schema, dto: state.valueChecks.dto}})
              }
            />
          }
          label="Interface"
          labelPlacement="start"
        />
        <FormControlLabel
          value="dto"
          control={
            <Checkbox
              color="primary"
              onChange={(event) =>
                setState({...state, valueChecks: {dto: event.target.checked, interface: state.valueChecks.interface, schema: state.valueChecks.schema}})
              }
            />
          }
          label="Dto"
          labelPlacement="start"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => convert()}
          disabled={
            !(state.valueChecks.schema || state.valueChecks.interface || state.valueChecks.dto) ||
            (!state.validJson && state.json.length > 0) ||
            state.json.length === 0 ||
            state.name.length === 0
          }
        >
          Convert
        </Button>
      </div>
      {state.valueChecks.schema || state.valueChecks.interface || state.valueChecks.dto ? (
        <Paper square>
          <Tabs
            value={state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, id) => setState({...state, value: id})}
            aria-label="disabled tabs example"
          >
            {state.valueChecks.schema ? <Tab label="Schema" /> : null}
            {state.valueChecks.interface ? <Tab label="Interface" /> : null}
            {state.valueChecks.dto ? <Tab label="Dto" /> : null}
          </Tabs>
        </Paper>
      ) : null}
      {(() => {
        if (state.value === 0 && state.valueChecks.schema) {
          return <Schema />;
        }
        if (state.value === 1 && state.valueChecks.interface) {
          return <Interface />;
        }
        if (state.value === 2 && state.valueChecks.dto) {
          return <Dto />;
        }
      })()}{' '}
    </div>
  );
};

export default Target;
