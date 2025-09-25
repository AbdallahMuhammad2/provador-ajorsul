/* Standalone Function: validate */

function validate(d) {
    return typeof d == "string" && regex.test(d)
}

export default validate;
