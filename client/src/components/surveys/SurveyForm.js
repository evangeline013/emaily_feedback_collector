import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyFiled from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title', noValueError: 'Please provide a Survey Title' },
    { label: 'Subject Line', name: 'subject', noValueError: 'Please provide a Subject Line' },
    { label: 'Email Body', name: 'body', noValueError: 'Please provide Email Body' },
    { label: 'Recipient List', name: 'emails', noValueError: 'Please provide Recipient List' },
];

class SurveyForm extends Component {
    renderFields() {
        return (
            FIELDS.map(({ label, name }) => {
                return <Field key={name} label={label} type="text" name={name} component={SurveyFiled} />;
            })
        );
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');

    FIELDS.forEach(({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    })

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
})(SurveyForm);