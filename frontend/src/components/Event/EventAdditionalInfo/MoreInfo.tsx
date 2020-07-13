import React from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { Field, reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';

//import RadioSelect from '../RadioSelect';
import {StyleDiv, EventDiv, TextDiv, TextSmallDiv } from '../../Styling/TextStyle';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import AlertMessage from '../AlertMessage';


const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginBottom: theme.spacing(2),
        }
      },
      margin: {
        justifyContent: 'center', 
        alignItems: "center",
        display: 'flex',
      },
  }));

const required = value => value ? undefined : 'Required';
const Range = value => value && (Number(value) < 0 || Number(value)>5000) ? 'Invalid Price, enter from 0 to 5000!': undefined;

interface Props {
  course: boolean;
}

const validate = values => {
    const errors = { priceSplit: '' };
    const requiredFields = [
        'titleEvent',
        'description',
        'volunteeringEvent',
        'bringBox',
        'priceSplit'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });

    if(+values.priceSplit){
      if(+values.priceSplit>5000 || +values.priceSplit<0) {
        errors.priceSplit = 'Invalid price entered';
      }
  }
    return errors;
};

  const RadioSelect = ({ input, ...rest }) => {
    const classes = useStyles();
    return (
      <FormControl component="fieldset" className={classes.root}>
        <RadioGroup row aria-label="position" name="position" defaultValue="top" className={classes.margin} {...input}{...rest}>
          <FormControlLabel value="yes" control={<Radio style={{ color: 'darkorange' }} />} label='Yes' />
          <FormControlLabel value="no" control={<Radio style={{ color: 'darkorange' }} />} label='No' />
        </RadioGroup>
      </FormControl>
    );
  }

const MoreInfo = (props: Props) => {
    const { course } = props;
        return (
            <StyleDiv>
                <MuiThemeProvider theme={theme}>
                    <TextDiv>
                        Tell us more?
                    </TextDiv>

                <EventDiv>
                    <TextSmallDiv>Give your Event a title</TextSmallDiv>
                    <Field
                        validate={[ required ]}
                        name='titleEvent'
                        component={renderTitle}
                    />
                </EventDiv>
                <Divider variant="middle" />
                <EventDiv>
                    <TextSmallDiv>Add description</TextSmallDiv>
                    <Field
                        validate={[ required ]}
                        name='description'
                        component={renderDescription}
                    />
                </EventDiv>
                <Divider variant="middle" />
                {
                    !course
                    ? 
                    <div>
                    <EventDiv>
                        <TextSmallDiv>Is this a volunteering event?</TextSmallDiv>
                        <Field
                            validate={[ required ]}
                            name='volunteeringEvent'
                            component={RadioSelect}
                        />
                    </EventDiv>
                    <Divider variant="middle" />
                    <EventDiv>
                        <TextSmallDiv>What should people bring?</TextSmallDiv>
                        <Field
                            validate={[ required ]}
                            name='bringBox'
                            component={renderBringBox}
                        />
                    </EventDiv>
                    <Divider variant="middle" />
                    <EventDiv>
                    <TextSmallDiv>...or suggest price split?</TextSmallDiv>
                    <Field
                        validate={[ required, Range ]}
                        name='priceSplit'
                        component={renderSplitPrice}
                    />
                    </EventDiv>
                </div>
                :
                null
                }
                </MuiThemeProvider>
            </StyleDiv>
        );
}



const renderTitle = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <TextField
            {...input}
            id="standard-basic"
            style={{ width: '90%'}}
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
      </div>
    );
  };

  const renderDescription = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <TextField
            {...input}
            style={{ width: '90%'}}
            multiline
            rows={2}
            variant="outlined"
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
        </div>
    );
  };

  const renderBringBox = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <TextField
            {...input}
            id="standard-multiline-static"
            style={{ width: '90%'}}
            multiline
            rows={2}
            variant="outlined"
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
        </div>
    );
  };

  const renderSplitPrice = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
  }) => {
    return(
      <div>
        <TextField
            {...input}
            id="outlined-number"
            label='€'
            type="number"
            defaultValue="0"
            inputProps={{ min: "0", max: "5000"}} 
            variant="outlined"
        />
        {touched && ((error && <AlertMessage>{error}</AlertMessage>))}
        </div>
    );
  };


export default reduxForm<{}, Props>({
    form: 'MoreInfo',
    validate,
  })(MoreInfo);