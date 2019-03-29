function game(id, response){
    var network = require("/ui/services/network");
     
    var cover = response[0].cover != null ? "http:" + response[0].cover.url.replace("t_thumb","t_thumb_2x") : "";
    var title = response[0].name != null ? response[0].name : "";
    var rating = response[0].rating != null ? Math.round(response[0].rating) / 10 + " / 10" : "- - / 10";
    var textSummary = response[0].summary != null ? response[0].summary : "Sem descrição disponível.";
    var urlvideo = response[0].videos != null ? "https://www.youtube.com/watch?v=" + response[0].videos[0].video_id : "https://www.youtube.com/";
    var date = response[0].created_at != null  ? new Date(response[0].created_at) : "";

    //create window
    var window = Titanium.UI.createWindow({
        backgroundColor : '#ffffff',
        exitOnClose : false,
        orientationModes : [Titanium.UI.PORTRAIT],
        title : "Game"
    });
    	
    
    window.addEventListener("open", function(){
    	
    	var activity = this.getActivity();
    	
    	if(activity){
    		console.log("Tem activity");
    		var actionBar = activity.getActionBar();
    		if(actionBar){
    			
    			actionBar.setDisplayHomeAsUp(true);
    			
    			actionBar.setOnHomeIconItemSelected(function(){
    				window.close();
    			});
    		}
    	}
    	
    });
    
    //create scrollView
    var scrollView = Titanium.UI.createScrollView({
        // layout : "vertical",
    });
    window.add(scrollView);
        
        var slide = Titanium.UI.createView({
            height : Titanium.UI.SIZE,
            width : Titanium.UI.SIZE,
            top : 0,
            backgroundColor : "#efefef"
        });
        scrollView.add(slide);
        
            var slideScroll = Titanium.UI.createScrollableView({
                height : 220,
                width : Titanium.UI.SIZE,
                showPagingControl : false,
                touchEnabled : true,
                top : 0,
            });
            slide.add(slideScroll);
            
        var iconVideo = Titanium.UI.createImageView({
            top : 195,
            right : 20,
            height : 50,
            width : 50,
            image : "/images/ic_play.png",
            zIndex : 2,
            backgroundColor : "#ffffff",
            borderRadius : 25,
            elevation : 10
        });
        scrollView.add(iconVideo);
        
        iconVideo.addEventListener("click", function(){
            Titanium.Platform.openURL(urlvideo);
        });
        
        var body = Titanium.UI.createView({
            height : Titanium.UI.SIZE,
            width : Titanium.UI.SIZE,
            top: 230,
            left : 20,
            right : 20,
            layout :  "vertical"
        });
        scrollView.add(body);
        
            var header = Titanium.UI.createView({
                height : Titanium.UI.SIZE,
                width : Titanium.UI.SIZE,
                top: 0,
                left : 0,
                right : 0,
                layout : "horizontal"
            });
            body.add(header);
            
                var headerCover = Titanium.UI.createImageView({
                    borderRadius: 10,
                    width : 100,
                    elevation : 10,
                    left : 0,
                    top : 20,
                    image : cover
                });
                header.add(headerCover);
                
                    var headerInfo = Titanium.UI.createView({
                        left : 20,
                        top: 20,
                        layout : "vertical",
                        height : Titanium.UI.SIZE
                    });
                    header.add(headerInfo);
                    
                        var headerTitle = Titanium.UI.createLabel({
                            font : {
                                fontSize : 16,
                                fontWeight : "bold",
                            },
                            left : 0,
                            color : "#333333",
                            maxLines : 3,
                            text : title
                        });
                        headerInfo.add(headerTitle);
                        
                        var headerGenres = Titanium.UI.createLabel({
                            color : "#43a047",
                            font : {
                                fontSize : 14
                            },
                            top : 5,
                            bottom : 5,
                            left : 0,
                            maxLines : 2,
                            height : Titanium.UI.SIZE
                        });
                        headerInfo.add(headerGenres);
                        
                        var headerRating = Titanium.UI.createLabel({
                            color : "#333333",
                            left : 0,
                            font : {
                                fontSize : 14
                            },
                            text : rating
                        });
                        headerInfo.add(headerRating);
        
                var description = Titanium.UI.createView({
                    height : Titanium.UI.SIZE,
                    width : Titanium.UI.SIZE,
                    top : 20,
                    left : 0,
                    layout : "vertical"
                });
                body.add(description);
                
                    createItemDescription("developer", description, "");
                    createItemDescription("date", description, date.toLocaleDateString());
                
                    var line = Titanium.UI.createView({
                        height : 2,
                        width : Titanium.UI.FILL,
                        backgroundColor : "#F7F7F7",
                        top : 20
                    });
                    description.add(line);
                    
        
                var summary = Titanium.UI.createLabel({
                    font : {
                        fontSize : 15,
                        fontWeight : "normal"
                    },
                    top : 30,
                    bottom : 30,
                    color : "#333333",
                    height : Titanium.UI.SIZE,
                    text : textSummary
                });
                body.add(summary);
    
    
    var idGenres = convertArrayToString(response[0].genres);
    network.getNameById(idGenres, "genres", function(response){
        if(response != null && Array.isArray(response)){
            var genres = "";
            
            for(var i = 0; i < response.length; i++){
                genres += response.length - i == 1 ? response[i].name : response[i].name + ",  ";
            }
            headerGenres.setText(genres);
        }
    });
    
    var idDevelopers = convertArrayToString(response[0].developers);
    network.getNameById(idDevelopers, "companies", function(response){
        if(response != null && Array.isArray(response)){
            var developers = "";
            
            for(var i = 0; i < response.length; i++){
                developers += response.length - i == 1 ? response[i].name : response[i].name + ",  ";
            }
            developerValue.setText(developers);
        }
    });
    
    var arrayImages = [];
    if(response[0].screenshots != null){
        for(var i = 0; i < response[0].screenshots.length; i++){
            var screenshot = response[0].screenshots[i].url != null ? "http:" + response[0].screenshots[i].url.replace("t_thumb","t_screenshot_med") : "";
            
            arrayImages.push(Titanium.UI.createImageView({
                height : 220,
                left : 0,
                right : 0,
                image : screenshot
            }));
        }
        slideScroll.setViews(arrayImages);
        var slideControl = require("/ui/utilities/SlideControl");
        slide.add(slideControl(slideScroll));
    }
    
    
    return window;
}


function convertArrayToString(array){
    if(array != null && Array.isArray(array)){
        var item = "";
        
        for(var i = 0; i < array.length; i++){
            item += array.length - i == 1 ? array[i] : array[i] + ",";
        }
        
        return item;
    }
}

function createItemDescription(item, reference, value){
    this[item + "Wrapper"] = Titanium.UI.createView({
        height : Titanium.UI.SIZE,
        width : Titanium.UI.SIZE,
        layout : "horizontal",
        left : 0
    });
    reference.add(this[item + "Wrapper"]);
    
        this[item + "Label"] = Titanium.UI.createLabel({
            font : {
                fontFamily : "Roboto",
                fontSize : 15,
                fontWeight : "bold"
            },
            color : "#333333",
            left : 0,
            height : Titanium.UI.SIZE,
            width : Titanium.UI.SIZE,
            maxLines : 1,
            text : item.charAt(0).toUpperCase() + item.slice(1)  + ":"
        });
        this[item + "Wrapper"].add(this[item + "Label"]);
        
        this[item + "Value"] = Titanium.UI.createLabel({
            font : {
                fontFamily : "Roboto",
                fontSize : 15,
            },
            color : "#333333",
            maxLines : 1,
            height : Titanium.UI.SIZE,
            width : Titanium.UI.SIZE,
            left : 10,
            text : value
        });
        this[item + "Wrapper"].add(this[item + "Value"]);
}

module.exports = game;
