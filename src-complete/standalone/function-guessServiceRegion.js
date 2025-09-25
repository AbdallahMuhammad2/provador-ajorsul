/* Standalone Function: guessServiceRegion */

function guessServiceRegion(d, o) {
    const {hostname: c, pathname: h} = d;
    if (c.endsWith(".on.aws")) {
        const nt = c.match(/^[^.]{1,63}\.lambda-url\.([^.]{1,63})\.on\.aws$/);
        return nt != null ? ["lambda", nt[1] || ""] : ["", ""]
    }
    if (c.endsWith(".r2.cloudflarestorage.com"))
        return ["s3", "auto"];
    if (c.endsWith(".backblazeb2.com")) {
        const nt = c.match(/^(?:[^.]{1,63}\.)?s3\.([^.]{1,63})\.backblazeb2\.com$/);
        return nt != null ? ["s3", nt[1] || ""] : ["", ""]
    }
    const _ = c.replace("dualstack.", "").match(/([^.]{1,63})\.(?:([^.]{0,63})\.)?amazonaws\.com(?:\.cn)?$/);
    let b = _ && _[1] || ""
      , _e = _ && _[2];
    if (_e === "us-gov")
        _e = "us-gov-west-1";
    else if (_e === "s3" || _e === "s3-accelerate")
        _e = "us-east-1",
        b = "s3";
    else if (b === "iot")
        b = c.startsWith("iot.") ? "execute-api" : c.startsWith("data.jobs.iot.") ? "iot-jobs-data" : h === "/mqtt" ? "iotdevicegateway" : "iotdata";
    else if (b === "autoscaling") {
        const nt = (o.get("X-Amz-Target") || "").split(".")[0];
        nt === "AnyScaleFrontendService" ? b = "application-autoscaling" : nt === "AnyScaleScalingPlannerFrontendService" && (b = "autoscaling-plans")
    } else
        _e == null && b.startsWith("s3-") ? (_e = b.slice(3).replace(/^fips-|^external-1/, ""),
        b = "s3") : b.endsWith("-fips") ? b = b.slice(0, -5) : _e && /-\d$/.test(b) && !/-\d$/.test(_e) && ([b,_e] = [_e, b]);
    return [HOST_SERVICES[b] || b, _e || ""]
}

export default guessServiceRegion;
