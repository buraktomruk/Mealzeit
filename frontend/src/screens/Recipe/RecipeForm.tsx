import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Container, Typography, makeStyles, Select, InputLabel, FormHelperText, FormControl } from '@material-ui/core';
import styled from 'styled-components';

const cuisineTypes = [
    { value: '', text: '' },
    { value: 'asian', text: 'Asian' },
    { value: 'indian', text: 'Indian' },
    { value: 'italian', text: 'Italian' },
    { value: 'mexican', text: 'Mexican' }
];

const foodTypes = [
    { value: '', text: '' },
    { value: 'breakfast', text: 'Breakfast & Brunch' },
    { value: 'dinner', text: 'Dinner' },
    { value: 'dessert', text: 'Desserts' },
    { value: 'snack', text: 'Appetizers & Snacks' },
    { value: 'drink', text: 'Drinks' }
];

const validate = values => {
    const errors = { email: '' };
    const requiredFields = [
        'email',
        'password'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    });
    // if (
    //     values.email &&
    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //     errors.email = 'Invalid email address';
    // }
    return errors;
};

const renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    type,
    ...custom
}) => (
        <TextField
            label={label}
            type={type}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
        />
    );

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>;
    }
};

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    // fullWidth,
    ...custom
}) => (
        <FormControl style={{ width: '100%' }} error={touched && error}>
            <InputLabel>{label}</InputLabel>
            <Select
                // native
                {...input}
                {...custom}
            >
                {children}
            </Select>
            {renderFromHelper({ touched, error })}
        </FormControl>
    );

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'unset'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'darkorange'
    }
}));

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledFieldDiv = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const LoginForm = ({ handleSubmit }) => {
    const classes = useStyles();

    return (
        <Container component='main' maxWidth='xs'>
            <StyledDiv>
                <Typography component='h1' variant='h5' style={{ color: 'darkorange' }}>
                    Create A Recipe
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <StyledFieldDiv>
                        <Field
                            name='recipTitle'
                            component={renderTextField}
                            label='Recipe Title'
                            fullWidth
                        />
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='ingredients'
                            component={renderTextField}
                            label='Ingredients'
                            fullWidth
                        />
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='estimatedTime'
                            component={renderTextField}
                            label='Estimated Time'
                            type='numeric'
                            fullWidth
                        />
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='instructions'
                            component={renderTextField}
                            label='Instructions'
                            fullWidth
                            multiline
                            rows={2}
                            rowsMax={4}
                        />
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='cuisineType'
                            component={renderSelectField}
                            label='Cuisine Type'
                            fullWidth
                        >
                            {cuisineTypes.map((cuisine) => (
                                <option value={cuisine.value}>{cuisine.text}</option>
                            ))
                            }
                        </Field>
                    </StyledFieldDiv>
                    <StyledFieldDiv>
                        <Field
                            name='foodType'
                            component={renderSelectField}
                            label='Food Type'
                            fullWidth
                        >
                            {foodTypes.map((food) => (
                                <option value={food.value}>{food.text}</option>
                            ))
                            }
                        </Field>
                    </StyledFieldDiv>
                </form>
            </StyledDiv>
        </Container>
    );
};

export default reduxForm({
    form: 'recipeForm',
    validate
})(LoginForm);