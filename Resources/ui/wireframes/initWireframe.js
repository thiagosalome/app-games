function initWireframe(){
    var animation = Titanium.UI.createAnimation({
        left : 100,
        repeat : 1000,
        duration : 1000,
    });
    
    var preScrollView = Titanium.UI.createScrollView({
        backgroundColor : "#ffffff",
        layout : "vertical",
    });
    preScrollView.hide();    
       
    for(var i = 0; i < 4; i++){
        
        this["preGame" + i] = Titanium.UI.createView({
            height : Titanium.UI.SIZE,
            width : Titanium.UI.SIZE,
            top : 5,
            bottom : 5
        });
        preScrollView.add(this["preGame" + i]);
            
            this["preGameCover" + i] = Titanium.UI.createView({
                borderRadius: 10,
                width : 100,
                height : 100,
                elevation : 10,
                left : 20,
                top : 10,
                backgroundColor : "#efefef"
            });
            this["preGame" + i].add(this["preGameCover" + i]);
            
                this["preGameCoverAnimate" + i] = Titanium.UI.createView({
                    width : 50,
                    height : 100,
                    left : -50,
                    backgroundGradient : {
                        type : "linear",
                        startPoint : {
                            x : "0%",
                            y : "50%"
                        },
                        endPoint : {
                            x : "100%",
                            y : "50%"
                        },
                        colors : ['#EAEAEA', '#DBDBDB']
                    }
                });
                this["preGameCover" + i].add(this["preGameCoverAnimate" + i]);
                
                    this["preGameCoverAnimate" + i].animate(animation);
            
            this["preGameCard" + i] = Titanium.UI.createView({
                height: Titanium.UI.SIZE,
                backgroundColor : "#ffffff",
                left : 45,
                right : 20,
                top : 5,
                bottom: 5,
                borderRadius : 10,
                elevation : 8
            });
            this["preGame" + i].add(this["preGameCard" + i]);
                
                this["preGameInfo" + i] = Titanium.UI.createView({
                    left : 90,
                    right : 10,
                    top : 20,
                    bottom : 20,
                    height : Titanium.UI.SIZE,
                    width: Titanium.UI.SIZE,
                    layout : "vertical"
                });
                this["preGameCard" + i].add(this["preGameInfo" + i]);
                
                    this["preGameTitle" + i] = Titanium.UI.createView({
                        left : 0,
                        lines : 1,
                        height : 25,
                        bottom : 5,
                        backgroundColor : "#eaeaea"
                    });
                    this["preGameInfo" + i].add(this["preGameTitle" + i]);
                    
                    this["preGameGenres" + i] = Titanium.UI.createView({
                        font : {
                            fontSize : 14
                        },
                        top : 5,
                        bottom : 5,
                        left : 0,
                        lines : 1,
                        height : 15,
                        backgroundColor : "#eaeaea"
                    });
                    this["preGameInfo" + i].add(this["preGameGenres" + i]);
                    
                    var preGameRating = Titanium.UI.createView({
                        left : 0,
                        height : 15,
                        backgroundColor : "#eaeaea"
                    });
                    this["preGameInfo" + i].add(preGameRating);
        
    }
    
    return preScrollView;
}

module.exports = initWireframe;
