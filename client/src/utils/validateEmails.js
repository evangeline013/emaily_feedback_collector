const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
    const invalidEmailsArray = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => !emailRegex.test(email));

    if (invalidEmailsArray.length) {
        return `These emails are invalid: ${invalidEmailsArray}`;
    }

    return;
}