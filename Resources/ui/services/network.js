const URL_BASE = "https://api-endpoint.igdb.com";
const USER_KEY = "";
const HEADER = "application/json";

module.exports.getGameById = function(params, callback){
    var connect = Titanium.Network.createHTTPClient();
    
    connect.setTimeout(10000);
    
    connect.onload = function(){
        var response = JSON.parse(this.responseText);
        callback(response);
    };
    
    connect.onerror = function(e){
        Titanium.API.warn("Ocorreu erro na conexão : " + e.error);
    };
    
    connect.setRequestHeader("user-key", USER_KEY);
    connect.setRequestHeader("Accept", HEADER);
    var url = URL_BASE + "/games/" + params.id + "?fields=" + params.fields;
    connect.open("GET", url);
    connect.send();
};

module.exports.getNameById = function(id, type, callback){
    var connect = Titanium.Network.createHTTPClient();
    
    connect.setTimeout(10000);
    
    connect.onload = function(){
        var response = JSON.parse(this.responseText);
        callback(response);
    };
    
    connect.onerror = function(e){
        Titanium.API.warn("Ocorreu erro na conexão : " + e.error);
    };
    
    connect.setRequestHeader("user-key", USER_KEY);
    connect.setRequestHeader("Accept", HEADER);
    var url = URL_BASE + "/" + type + "/" + id + "?fields=name";
    connect.open("GET", url);
    connect.send();
};

module.exports.getGamesByGenre = function(params, callback){
    
    var connect = Titanium.Network.createHTTPClient();
    
    connect.setTimeout(10000);
    
    connect.onload = function(){
        var response = JSON.parse(this.responseText);
        callback(response);
    };
    
    connect.onerror = function(e){
        Titanium.API.warn("Ocorreu erro na conexão : " + e.error);
    };
    
    connect.setRequestHeader("user-key", USER_KEY);
    connect.setRequestHeader("Accept", HEADER);
    var url = URL_BASE + "/games/?filter[genres][eq]=" + params.genreId + "&fields=" + params.fields + "&limit=" + params.limit + "&offset=" + params.offset + "&order=" + params.order + ":desc";
    connect.open("GET", url);
    connect.send();
};

module.exports.getGenresById = function(params, callback){
    var connect = Titanium.Network.createHTTPClient();
    
    connect.setTimeout(10000);
    
    connect.onload = function(){
        var response = JSON.parse(this.responseText);
        callback(response);
    };
    
    connect.onerror = function(e){
        Titanium.API.warn("Ocorreu erro na conexão : " + e.error);
    };
    
    connect.setRequestHeader("user-key", USER_KEY);
    connect.setRequestHeader("Accept", HEADER);
    var url = URL_BASE + "/genres/" + params.id + "?fields=" + params.fields;
    connect.open("GET", url);
    connect.send();
};

module.exports.getAllGenres = function(callback){
    var connect = Titanium.Network.createHTTPClient();
    
    connect.setTimeout(10000);
    
    connect.onload = function(){
        var response = JSON.parse(this.responseText);
        callback(response);
    };
    
    connect.onerror = function(e){
        Titanium.API.warn("Ocorreu erro na conexão : " + e.error);
    };
    
    connect.setRequestHeader("user-key", USER_KEY);
    connect.setRequestHeader("Accept", HEADER);
    connect.open("GET", URL_BASE + "/genres/?fields=name,slug&order=name&limit=20");
    connect.send();
};
