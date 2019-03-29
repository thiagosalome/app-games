var templateCard = {
    childTemplates : [
        {
            type : "Titanium.UI.View",
            bindId : "game",
            properties : {
                height : Titanium.UI.SIZE,
                width : Titanium.UI.SIZE,
                top : 5,
                bottom : 5
            },
            childTemplates : [
                {
                    type : "Titanium.UI.ImageView",
                    bindId : "gameCover",
                    properties : {
                        borderRadius: 10,
                        width : 100,
                        elevation : 10,
                        left : 20,
                        top : 10,
                        backgroundColor : "#efefef"
                    }
                },
                {
                    type : "Titanium.UI.View",
                    bindId : "gameCard",
                    properties : {
                        height: Titanium.UI.SIZE,
                        backgroundColor : "#ffffff",
                        left : 45,
                        right : 20,
                        top : 5,
                        bottom: 5,
                        borderRadius : 10,
                        elevation : 8
                    },
                    childTemplates : [
                        {
                            type : "Titanium.UI.View",
                            bindId : "gameInfo",
                            properties : {
                                left : 90,
                                right : 10,
                                top : 20,
                                bottom : 20,
                                height : Titanium.UI.SIZE,
                                width: Titanium.UI.SIZE,
                                layout : "vertical"
                            },
                            childTemplates : [
                                {
                                    type : "Titanium.UI.Label",
                                    bindId : "gameTitle",
                                    properties : {
                                        font : {
                                            fontSize : 16,
                                            fontWeight : "bold",
                                        },
                                        left : 0,
                                        color : "#333333",
                                        maxLines : 1
                                    }
                                },
                                {
                                    type : "Titanium.UI.Label",
                                    bindId : "gameGenres",
                                    properties : {
                                        color : "#43a047",
                                        font : {
                                            fontSize : 14
                                        },
                                        top : 5,
                                        bottom : 5,
                                        left : 0,
                                        lines : 1,
                                        height : Titanium.UI.SIZE
                                    }
                                },
                                {
                                    type : "Titanium.UI.Label",
                                    bindId : "gameRating",
                                    properties : {
                                        color : "#333333",
                                        left : 0,
                                        font : {
                                            fontSize : 14
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

module.exports = templateCard;
