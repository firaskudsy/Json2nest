import React from 'react';
import {useContext, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {BaseContext} from './../Context/BaseContext';
import Paper from '@material-ui/core/Paper';
import {useForm} from 'react-hook-form';

const JsonSource = () => {
  const [state, setState] = useContext(BaseContext);

  const {register, handleSubmit, watch, errors} = useForm({mode: 'onChange'});
  const onSubmit = (data) => setState({...state, json: data.json, name: data.name, validJson: true});

  console.log(watch('name'));
  const validateJSON = (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return 'error';
    }
  };
  return (
    <div className="Source__body">
      <form className="Source__field " onSubmit={handleSubmit(onSubmit)}>
        <label className="Form__label">Name</label>
        <input className={'Form__field ' + (errors.name ? 'invalid' : '')} name="name" defaultValue="" ref={register({required: true})} />

        {errors.name && <small className="Form_error">name is required</small>}

        {/* include validation with required or other standard HTML validation rules */}
        <label className="Form__label">Json</label>

        <textarea
          className={'Form__field ' + (errors.json ? 'invalid' : '')}
          name="json"
          defaultValue=""
          ref={register({
            required: true,
            validate: (value) => validateJSON(value)
          })}
        />
        {/* errors will return when field validation fails  */}
        {errors.json && <small className="Form_error">invalid JSON format</small>}
        <div className="Form__submit">
          <Button variant="contained" type="submit" color="primary" disabled={errors.name || errors.json }>
            Set
          </Button>
        </div>
      </form>

      {/* <Paper square elevation={0}>
        <div className="Source__field ">
          <TextField id="outlined-static" label="Name" defaultValue="" onChange={(event) => setState({...state, name: event.target.value})} variant="filled" />

          <TextField
            className={state.validJson ? '' : 'invalid'}
            id="outlined-multiline-static"
            label="Json Source"
            multiline
            rows={4}
            defaultValue=""
            onChange={(event) => {
              try {
                const m = JSON.parse(event.target.value);
                setState({...state, json: event.target.value, validJson: true});
              } catch (error) {
                setState({...state, json: event.target.value, validJson: false});
              }
            }}
            variant="filled"
          />
        </div>
      </Paper> */}
    </div>
  );
};

export default JsonSource;
