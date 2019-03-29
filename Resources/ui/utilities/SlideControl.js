function SlideControl(scrollableView) {

    // Configuration
    var numberOfPages = 0;
    var pages = [];
    var page;
    
    var pageColor = "#ffffff";
    var container = Titanium.UI.createView({
        bottom : 16,
        height : 8,
        width: Titanium.UI.SIZE,
        zIndex : 1000
    });
    
    scrollableView.setShowPagingControl(false);
    
    // Keep a global reference of the available pages
    numberOfPages = scrollableView.getViews().length;

    pages = [];
    // without this, the current page won't work on future references of the module

    // Go through each of the current pages available in the scrollableView
    for (var i = 0; i < numberOfPages; i++) {
        page = Titanium.UI.createView({
            borderRadius : 4,
            borderWidth : 1,
            width : 7,
            height : 7,
            left : 15 * i,
            backgroundColor : pageColor,
            opacity : 0.4
        });
        // Store a reference to this view
        pages.push(page);
        // Add it to the container
        container.add(page);
    }

    onScroll = function(event) {
        // Go through each and reset it's opacity
        for (var i = 0; i < numberOfPages; i++) {
            pages[i].setOpacity(0.5);
            pages[i].animate({
                width : 7,
                height : 7,
                duration : 150
            });
        }
        // Bump the opacity of the new current page
        pages[event.currentPage].setOpacity(1);
        pages[event.currentPage].animate({
            width : 7,
            height : 7,
            duration : 150
        });
    
    };
    
    onPostLayout = function(event) {
        // Go through each and reset it's opacity
        for (var i = 0; i < numberOfPages; i++) {
            pages[i].animate({
                width : 7,
                height : 7,
                duration : 150
            });
        }
        // Bump the opacity of the new current page
        pages[scrollableView.currentPage].animate({
            width : 7,
            height : 7,
            duration : 150,
        });
    };
    
    // Mark the initial selected page
    pages[scrollableView.getCurrentPage()].setOpacity(1);
    // Attach the scroll event to this scrollableView, so we know when to update things
    scrollableView.addEventListener("scrollend", onScroll);
    // Reset page control to default page when scollableView refresh
    scrollableView.addEventListener("postlayout", onPostLayout);

    return container;
};
module.exports = SlideControl; 