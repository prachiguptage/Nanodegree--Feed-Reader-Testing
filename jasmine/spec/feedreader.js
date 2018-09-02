/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test Suite to determine whether RSS feed contains appropriate data */
    describe('RSS Feeds', function() {
        /* Test - it tests to make sure that the allFeeds variable 
         * has been defined and are not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test- To determine whether allFeed object has 
         * URL defined and the URL is not empty.
         */

         it('URL defined',function(){

            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });


        /* Test- To determine whether allFeed object has 
         * a name defined and that the name is not empty.
         */
         it('Name defined',function(){

            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    /* Test suite named "The menu" - To determine menu functionality*/

    describe('The menu',function(){

        let body;

        beforeEach(function(){
            body = document.querySelector('body');
        });


        /* Test- to determine if menu is hidden by default
         */
         it('Hidden by default',function(){
            
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* Test- To determine menu visibility channges when menu icon is clicked
          */
          it("on Click Visible and Hidden", function(){

            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
             menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);

          });
     });

    /*Test suite named "Initial Entries"- To determine whether required field has appropriate data */
    describe('Initial Enteries',function(){

        /* Test- .feed container contain at leasr one .entry container
         */   
         beforeEach(function(done){
            loadFeed(0,function(){
                done();
            });
         });
         it('Complete Loading',function(done){
            const feed= document.querySelector('.feed');
            expect(feed.children.length>0).toBe(true);
            done();
         });
    });

    /* Test suite named "New Feed Selection" - All Feed have distinct enteries */
    describe('New Feed Selection', function(){

        /* Test- New Feed content is changed by looadFeed fuction.
         */
        const firstFeed=[];
        const otherFeed=[];
        const feed = document.querySelector('.feed');
        beforeEach(function(done){
            loadFeed(0);
            Array.from(feed.children).forEach(function(entry){
                    firstFeed.push(entry.innerText);
            });
            loadFeed(1, function(){
                Array.from(feed.children).forEach(function(entry){
                    otherFeed.push(entry.innerText);
                });
                done();
            });
        });

        it('different Content',function(done){
            otherFeed.forEach(function(other){
                firstFeed.forEach(function(first){
                   expect(other === first).toBe(false); 
                });
            });
            done();
        });
    });
}());
