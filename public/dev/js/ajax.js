module.exports = function(url, type, data, next) {
    type = (type) ? type : 'GET';

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        next(arguments);
    };
    xmlhttp.open(type, url, true);
    xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xmlhttp.send((data ? data : ''));
};