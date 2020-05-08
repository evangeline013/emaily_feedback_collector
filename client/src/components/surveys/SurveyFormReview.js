import React from 'react';
import formFields from './formFields';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
    const reviewFields = formFields.map( ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat white-text right" onClick={() => submitSurvey(formValues)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

const mapStateToProps = state => {
    return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(SurveyFormReview);