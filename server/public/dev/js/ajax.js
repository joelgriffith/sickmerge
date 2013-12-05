module.exports = function(param) {

    // Normalizing variables
    var url = (param.url) ? param.url : '/',
        type = (param.type) ? param.type : 'GET',
        data = (param.data) ? param.data : '',
        done = (param.done) ? param.done : null;

    // The request setup
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(type, url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send((data) ? JSON.stringify(data) : '');
    
    // Response
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                done(null, xmlhttp.responseText);
            } else {
                done(xmlhttp.responseText);
            }
        }
    };
};