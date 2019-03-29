function init(){
    var Game = require("/ui/handheld/Game");
    
    var window = Titanium.UI.createWindow({
        backgroundColor : "#f2f2f2",
        layout : "vertical",
        orientationModes : [Titanium.UI.PORTRAIT]
    });
    
    var pagingControl = require("/ui/utilities/PagingControl/widget");
    var network = require("/ui/services/network");
    
    var indicatorInit = Titanium.UI.createActivityIndicator({
        style: Titanium.UI.ActivityIndicatorStyle.BIG_DARK,
        height : 60,
        width : 60,
        top : "50%"
    });
    window.add(indicatorInit);
    indicatorInit.show();
   
    var initWireframe = require("/ui/wireframes/initWireframe");
    
    network.getAllGenres(function(response){
        indicatorInit.hide();
        window.remove(indicatorInit);

        
        var templateCard = require("/ui/templates/templateCard");
        var tabsList = [];
        
        //create footerView
        var footerView = Titanium.UI.createView({
            width: Titanium.UI.FILL,
            height: Titanium.UI.SIZE,
            backgroundColor : "#f2f2f2" 
        });
        
        //create activityIndicator
        var activityIndicator = Titanium.UI.createActivityIndicator({
            style: Titanium.UI.ActivityIndicatorStyle.BIG_DARK,
            top : 10,
            bottom: 10,
            width : 40,
            height : 40
        });
        footerView.add(activityIndicator);
        activityIndicator.show();
        
        for(var i = 0; i < response.length; i++){
            this["viewContent" + i] = Titanium.UI.createView({
                title : response[i].name,
                dataSlug : response[i].slug,
                onLoad : false,
            });
            tabsList.push(this["viewContent" + i]);
            
            this["listCards" + i] = Titanium.UI.createListView({
                templates : { "template" : templateCard },
                defaultItemTemplate : "template",
                separatorHeight : 0,
                top : 45,
                footerView : footerView,
                dataIndice : i,
                dataSlug : response[i].slug,
                onLoad : false
            });
            this["viewContent" + i].add(this["listCards" + i]);
            
            this["sections" + i] = [];
            this["sectionCard" + i] = Titanium.UI.createListSection();
            this["dataSectionCard" + i] = [];
            
         
            if(i == 0){
                var index = i;
                
                var params = {
                    genreId : genresSlugId[response[i].slug],
                    fields : "cover,name,rating,genres",
                    limit : 12,
                    offset : 0,
                    order : "popularity"
                };
                
                network.getGamesByGenre(params, function(response){
                    
                    for(var j = 0; j < response.length; j++){
                        var id = response[j].id;
                        var cover = response[j].cover != null ? "http:" + response[j].cover.url.replace("t_thumb","t_thumb_2x") : "";
                        var rating = response[j].rating != null ? Math.round(response[j].rating) / 10 + " / 10" : "- - / 10";
                        var genres = convertIdToGenre(response[j].genres);
                        
                        
                        this["dataSectionCard" + index].push({
                            gameId : id,
                            gameCover : {
                                image : cover
                            },
                            gameTitle : {
                                text : response[j].name
                            },
                            gameGenres : {
                                text : genres
                            },
                            gameRating : {
                                text : rating
                            }
                        });
                    }
                    
                    this["sectionCard" + index].setItems(this["dataSectionCard" + index]);
                        
                    this["sections" + index].push(this["sectionCard" + index]);
                      
                    this["listCards" + index].setSections(this["sections" + index]);

                    this["viewContent" + index].onLoad = true;
                    
                });
            }
            
            this["listCards" + i].setMarker({sectionIndex: 0, itemIndex: 11});
            
            /*
             * Offset: 0; itemIndex: 11;
             * Offset: 12; itemIndex: 23;
             * Offset: 24; itemIndex: 35;
             * Offset: 36; itemIndex: 47;
             * 
             * */
            
            this["listCards" + i].addEventListener("marker", function(e){
                var slug = e.source.dataSlug;
                var index = e.source.dataIndice;
                var onLoad = e.source.onLoad;
                var limit = 12;
                var offset = e.itemIndex + 1;
                
                // console.log(e.sections[0]);
                
                /*if(onLoad == false){
                    offset = 12;
                    e.source.onLoad = true;
                }*/
                
                var params = {
                    genreId : genresSlugId[slug],
                    fields : "cover,name,rating,genres",
                    limit : limit,
                    offset : offset,
                    order : "popularity"
                };
                
                network.getGamesByGenre(params, function(response){
                    for(var j = 0; j < response.length; j++){
                        var id = response[j].id;
                        var cover = response[j].cover != null ? "http:" + response[j].cover.url.replace("t_thumb","t_thumb_2x") : "";
                        var rating = response[j].rating != null ? Math.round(response[j].rating) / 10 + " / 10" : "- - / 10";
                        var genres = convertIdToGenre(response[j].genres);
                        
                        this["dataSectionCard" + index].push({
                            gameId : id,
                            gameCover : {
                                image : cover
                            },
                            gameTitle : {
                                text : response[j].name
                            },
                            gameGenres : {
                                text : genres
                            },
                            gameRating : {
                                text : rating
                            }
                        });
                    }
                    
                    this["sectionCard" + index].setItems(this["dataSectionCard" + index]);
                        
                    this["sections" + index].push(this["sectionCard" + index]);
                      
                    this["listCards" + index].setSections(this["sections" + index]);

                    this["viewContent" + index].onLoad = true;
                    
                    this["listCards" + index].setMarker({sectionIndex: 0, itemIndex: (offset + 11)});
                });
            });
            
            this["listCards" + i].addEventListener("itemclick", function(e){
                
                var progressIndicator = Titanium.UI.Android.createProgressIndicator({
                    message : "Loading...",
                    location : Titanium.UI.Android.PROGRESS_INDICATOR_DIALOG,
                    type : Titanium.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
                });
                progressIndicator.show();
                
                var id = e.section.items[e.itemIndex].gameId;
                
                network.getGameById(params = {id : id, fields : "*"}, function(response){
                    var game = new Game(id, response);
                    game.open();
                    
                    game.addEventListener("postlayout", function(){
                        progressIndicator.hide();
                    });
                });
                
            });
        }
        
        var pages = pagingControl.create({
            tabs : tabsList,
            top : 0,
            indicatorColor : "#ffffff",
            indicatorHeight : 2,
            tabsColor : "#43a047",
            dividerColor : "#43a047",
            labelsColor : "#ffffff",
            highlightEffect : true,
            shadowBar : true,
            tabWidth : 120,
            font:{
                fontSize: "16dp",           // The font family or specific font to use.
                fontFamily: "Robotto",      // Font size, in platform-dependent units. (pixels (px, pt, dp or dip, mm, in)
                fontWeight: "bold"          // Valid values are "bold" or "normal".
            },
            fancyScroll: true
        });
        
        pages.addEventListener("scrollend", function(e){
            console.log("currentPage:");
            console.log(e.source);
            var index = e.source.currentPage;
            var slug = e.source.views[index].dataSlug;
            var load = e.source.views[index].onLoad;
            
            if(load == false){
                var params = {
                    genreId : genresSlugId[slug],
                    fields : "cover,name,rating,genres",
                    limit : 12,
                    offset : 0,
                    order : "popularity"
                };
                
                network.getGamesByGenre(params, function(response){
                    for(var j = 0; j < response.length; j++){
                        var id = response[j].id;
                        var cover = response[j].cover != null ? "http:" + response[j].cover.url.replace("t_thumb","t_thumb_2x") : "";
                        var rating = response[j].rating != null ? Math.round(response[j].rating) / 10 + " / 10" : "- - / 10";
                        var genres = convertIdToGenre(response[j].genres);
                        
                        this["dataSectionCard" + index].push({
                            gameId : id,
                            gameCover : {
                                image : cover
                            },
                            gameTitle : {
                                text : response[j].name
                            },
                            gameGenres : {
                                text : genres
                            },
                            gameRating : {
                                text : rating
                            }
                        });
                    }
                    
                    this["sectionCard" + index].setItems(this["dataSectionCard" + index]);
                    
                    this["sections" + index].push(this["sectionCard" + index]);
                    
                    this["listCards" + index].setSections(this["sections" + index]);

                    this["viewContent" + index].onLoad = true;
                });
            }
        });
        
        window.add(pages);
    });
    
    
    return window;
}

var genresSlugId = {
    "puzzle" : 9,
    "hack-and-slash-beat-em-up" : 25,
    "real-time-strategy-rts" : 11,
    "pinball" : 30,
    "shooter" : 5,
    "music" : 7,
    "turn-based-strategy-tbs": 16,
    "point-and-click" : 2,
    "simulator" : 13,
    "arcade" : 33,
    "tactical" : 24,
    "quiz-trivia" : 26,
    "indie" : 32,
    "sport" : 14,
    "platform" : 8,
    "racing" : 10,
    "fighting" : 4,
    "strategy" : 15,
    "role-playing-rpg" : 12,
    "adventure" : 31
};

var genresIdName = {
    31 : "Adventure",
    33 : "Arcade",
    4 : "Fighting",
    25 : "Hack and slash/Beat 'em up",
    32 : "Indie",
    7 : "Music",
    30 : "Pinball",
    8 : "Platform",
    2 : "Point-and-click",
    9 : "Puzzle",
    26 : "Quiz/Trivia",
    10 : "Racing",
    11 : "Real Time Strategy (RTS)",
    12 : "Role-playing (RPG)",
    5 : "Shooter",
    13 : "Simulator",
    14 : "Sport",
    15 : "Strategy",
    24 : "Tactical",
    16 : "Turn-based strategy (TBS)"
};

function convertIdToGenre(arrayIdGenres){
    var genres = "";
    
    for(var i = 0; i < arrayIdGenres.length; i++){
        genres += arrayIdGenres.length - i == 1 ? genresIdName[arrayIdGenres[i]] : genresIdName[arrayIdGenres[i]] + ",  ";
    }
    
    return genres;
}

module.exports = init;
