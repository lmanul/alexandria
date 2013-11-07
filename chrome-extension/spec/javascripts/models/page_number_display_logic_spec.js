describe("Readium.Models.PageNumberDisplayLogic", function () {

    describe("going to pages", function () {

        beforeEach(function () {
            this.pageNumSelector = new Readium.Models.PageNumberDisplayLogic();

            // Rationale: This function will make these sets of repetitive tests clearer - as in, the conditions of the 
            //   EPUB, the page to go to and the expected result.
            this.testGetPageNumber = function (params) {

                var selectedPageNums = this.pageNumSelector.getGotoPageNumsToDisplay(
                    params.goToPage, 
                    params.twoUp, // two pages displayed?
                    params.isFXL, // is FXL? 
                    params.pageProgDir, // page prog. direction
                    params.firstPageOffset // first page offset
                    );

                return selectedPageNums;
            };
        });

        describe("1 page displayed", function () {

            it ("gets selected page number when LTR", function () {
                var pageNums = this.testGetPageNumber({ twoUp : false, isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                    goToPage : 1});
            
                expect(pageNums).toEqual([1]);
            });

            it ("gets selected page number when RTL", function () {
                var pageNums = this.testGetPageNumber({ twoUp : false, isFXL : false, pageProgDir : "rtl", firstPageOffset : false,
                    goToPage : 1});
            
                expect(pageNums).toEqual([1]);
            });
        });

        describe("2 pages displayed", function () {

            describe("reflowable", function () {

                describe("LTR", function () {

                    it("gets 2 page numbers; go to p, p is odd", function () {
                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 1});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets 2 page numbers; go to p, p is odd, offset", function () {
                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : false, pageProgDir : "ltr", firstPageOffset : true,
                            goToPage : 3});
                    
                        expect(pageNums).toEqual([2, 3]);
                    });

                    it("gets 2 page numbers; go to p, p is even", function () {
                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets 2 page numbers; go to p, p is even, offset", function () {
                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : false, pageProgDir : "ltr", firstPageOffset : true,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([2, 3]);
                    });
                });

                describe("RTL", function () {

                    it("gets 2 page numbers; go to p, p is odd", function () {
                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : false, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 1});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets 2 page numbers; go to p, p is odd, offset", function () {
                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : false, pageProgDir : "rtl", firstPageOffset : true,
                            goToPage : 3});
                    
                        expect(pageNums).toEqual([2, 3]);
                    });

                    it("gets 2 page numbers; go to p, p is even", function () {
                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : false, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets 2 page numbers; go to p, p is even, offset", function () {
                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : false, pageProgDir : "rtl", firstPageOffset : true,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([2, 3]);
                    });
                });
            });

            describe("FXL", function () {

                describe("LTR", function () {

                    it("gets page numbers; go to p, p is left, p+1 is right", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 1});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets page numbers; go to p, p is left, p+1 is left", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 || pageNum === 2 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andReturn(false);

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 1});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets page numbers; go to p, p is left, p+1 is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 1});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets page numbers; go to p, p is right, p-1 is left", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });
                
                    it("gets page numbers; go to p, p is right, p-1 is right", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 || pageNum === 2 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([2]);
                    });

                    it("gets page numbers; go to p, p is right, p-1 is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 3 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([2]);
                    });

                    it("gets page numbers; go to p, p is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 3 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([2]);
                    });
                });

                describe("RTL", function () {

                    it("gets page numbers; go to p, p is right, p+1 is left", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 1});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets page numbers; go to p, p is right, p+1 is right", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 || pageNum === 2 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 1});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets page numbers; go to p, p is right, p+1 is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 1});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets page numbers; go to p, p is left, p-1 is right", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets page numbers; go to p, p is left, p-1 is left", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 || pageNum === 2 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([2]);
                    });

                    it("gets page numbers; go to p, p is left, p-1 is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([2]);
                    });

                    it("gets page numbers; go to p, p is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 3 ? true : false; });

                        var pageNums = this.testGetPageNumber({ twoUp : true, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            goToPage : 2});
                    
                        expect(pageNums).toEqual([2]);
                    });
                });
            });
        });
    });

    describe("getting previous page", function () {

        beforeEach(function () {
            this.pageNumSelector = new Readium.Models.PageNumberDisplayLogic();

            // Rationale: This function will make these sets of repetitive tests clearer - as in, the conditions of the 
            //   EPUB, the page to navigate to, and the expected result.
            this.testPrevPage = function (params) {

                var selectedPageNums = this.pageNumSelector.getPrevPageNumsToDisplay(
                    params.prevPageNum, 
                    params.isFXL, // is FXL? 
                    params.pageProgDir, // page prog. direction
                    params.firstPageOffset // first page offset
                    );

                return selectedPageNums;
            };
        });

        describe("reflowable", function () {

            describe("LTR", function () {

                it("go to p in [p-1, p]", function () {

                    var pageNums = this.testPrevPage({isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([1, 2]);
                });

                it("go to p in [p-1, p]; offset", function () {

                    var pageNums = this.testPrevPage({isFXL : false, pageProgDir : "ltr", firstPageOffset : true,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([2, 3]);
                });
            });

            describe("RTL", function () {

                it("go to p in [p, p-1]", function () {

                    var pageNums = this.testPrevPage({isFXL : false, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([1, 2]);
                });

                it("go to p in [p, p-1]; offset", function () {

                    var pageNums = this.testPrevPage({isFXL : false, pageProgDir : "rtl", firstPageOffset : true,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([2, 3]);
                });
            });
        });

        describe("FXL", function () {

            describe("RTL", function () {

                it("gets page numbers; Going to p in [p, p-1], p is left, p-1 is right", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 2 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 1 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([1, 2]);
                });

                it("gets page numbers; Going to p in [p, p-1], p is left, p-1 is left", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 1 || pageNum === 2 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2]);
                });

                it("gets page numbers; Going to p in [p, p-1], p is left, p-1 is center", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 2 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                        return pageNum === 1 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2]);
                });

                it("gets page numbers; Going to p in [p, p-1], p is right", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 2 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 1 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2]);
                });

                it("gets page numbers; Going to p in [p, p-1], p is center", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 1 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                        return pageNum === 2 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2]);
                });
            });

            describe("LTR", function () {

                it("gets page numbers; Going to p in [p-1, p], p is right, p-1 is left", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 2 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 1 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([1, 2]);
                });

                it("gets page numbers; Going to p in [p-1, p], p is right, p-1 is right", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 1 || pageNum === 2 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2]);
                });

                it("gets page numbers; Going to p in [p-1, p], p is right, p-1 is center", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 2 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                        return pageNum === 1 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2]);
                });

                it("gets page numbers; Going to p in [p-1, p], p is left", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 2 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 1 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2]);
                });

                it("gets page numbers; Going to p in [p-1, p], p is center", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                        return pageNum === 2 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 1 ? true : false; });

                    var pageNums = this.testPrevPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2]);
                });
            });
        });
    });

    describe("getting next page", function () {

        beforeEach(function () {
            this.pageNumSelector = new Readium.Models.PageNumberDisplayLogic();

            // Rationale: This function will make these sets of repetitive tests clearer - as in, the conditions of the 
            //   EPUB, the page to navigate to, and the expected result.
            this.testNextPage = function (params) {

                var selectedPageNums = this.pageNumSelector.getNextPageNumsToDisplay(
                    params.prevPageNum, 
                    params.isFXL, // is FXL? 
                    params.pageProgDir, // page prog. direction
                    params.firstPageOffset // first page offset
                    );

                return selectedPageNums;
            };
        });

        describe("reflowable", function () {

            describe("LTR", function () {

                it("go to p in [p, p+1]", function () {

                    var pageNums = this.testNextPage({isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3, 4]);
                });

                it("go to p in [p, p+1]; offset", function () {

                    var pageNums = this.testNextPage({isFXL : false, pageProgDir : "ltr", firstPageOffset : true,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2, 3]);
                });
            });

            describe("RTL", function () {

                it("go to p in [p+1, p]", function () {

                    var pageNums = this.testNextPage({isFXL : false, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3, 4]);
                });

                it("go to p in [p+1, p]; offset", function () {

                    var pageNums = this.testNextPage({isFXL : false, pageProgDir : "rtl", firstPageOffset : true,
                        prevPageNum : 2});
                
                    expect(pageNums).toEqual([2, 3]);
                });
            });
        });

        describe("FXL", function () {

            describe("RTL", function () {

                it("gets page numbers; Going to p in [p+1, p], p is right, p+1 is left", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3, 4]);
                });

                it("gets page numbers; Going to p in [p+1, p], p is right, p+1 is right", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 3 || pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3]);
                });

                it("gets page numbers; Going to p in [p+1, p], p is right, p+1 is center", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                        return pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3]);
                });

                it("gets page numbers; Going to p in [p+1, p], p is left", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3]);
                });

                it("gets page numbers; Going to p in [p+1, p], p is center", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3]);
                });
            });

            describe("LTR", function () {

                it("gets page numbers; Going to p in [p, p+1], p is left, p+1 is right", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3, 4]);
                });

                it("gets page numbers; Going to p in [p, p+1], p is left, p+1 is left", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 3 || pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3]);
                });

                it("gets page numbers; Going to p in [p, p+1], p is left, p+1 is center", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                        return pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3]);
                });

                it("gets page numbers; Going to p in [p, p+1], p is right", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3]);
                });

                it("gets page numbers; Going to p in [p, p+1], p is center", function () {

                    spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                        return pageNum === 3 ? true : false; });
                    spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                        return pageNum === 4 ? true : false; });

                    var pageNums = this.testNextPage({isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                        prevPageNum : 3});
                
                    expect(pageNums).toEqual([3]);
                });
            });
        });
    });

    describe("toggling two-up pages", function () {

        beforeEach(function () {
            this.pageNumSelector = new Readium.Models.PageNumberDisplayLogic();

            // Rationale: This function will make these sets of repetitive tests clearer - as in, the conditions of the 
            //   EPUB, the page to navigate to, and the expected result.
            this.testGotoPageNums = function (params) {

                var selectedPageNums = this.pageNumSelector.getPageNumbersForTwoUp(
                    params.twoUp, 
                    params.current_pages, // the pages currently displayed 
                    params.pageProgDir, // page progression direction
                    params.isFXL, // is a fixed layout section
                    params.firstPageOffset // first page is offset
                    );

                return selectedPageNums;
            };
        });

        describe("2 pages up", function () {

            describe("reflowable", function () {

                describe("LTR", function () {

                    it("gets 1 page number", function () {

                        var pageNums = this.testGotoPageNums({twoUp : true, isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [1, 2]});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets 1 page number at page num boundary", function () {

                        var pageNums = this.testGotoPageNums({twoUp : true, isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [0, 1]});
                    
                        expect(pageNums).toEqual([1]);
                    });
                });

                describe("RTL", function () {

                    it("gets 1 page number", function () {

                        var pageNums = this.testGotoPageNums({twoUp : true, isFXL : false, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [1, 2]});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets 1 page number at page num boundary", function () {

                        var pageNums = this.testGotoPageNums({twoUp : true, isFXL : false, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [0, 1]});
                    
                        expect(pageNums).toEqual([1]);
                    });
                });
            });

            describe("FXL", function () {

                describe("LTR", function () {

                    it("gets 1 page number", function () {

                        // Page left/right shouldn't matter

                        var pageNums = this.testGotoPageNums({twoUp : true, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [1, 2]});
                    
                        expect(pageNums).toEqual([1]);
                    });
                });

                describe("RTL", function () {

                    it("gets 1 page number;", function () {

                        // Page left/right shouldn't matter

                        var pageNums = this.testGotoPageNums({twoUp : true, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [1, 2]});
                    
                        expect(pageNums).toEqual([1]);
                    });
                });
            });
        });

        describe("1 page up", function () {

            // Reflowable; page progression direction doesn't matter
            describe("reflowable", function () {

                it("gets 2 page numbers; odd page", function () {

                    var pageNums = this.testGotoPageNums({twoUp : false, isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                        current_pages : [1]});
                
                    expect(pageNums).toEqual([1, 2]);
                });

                it("gets 2 page numbers; odd page, offset", function () {

                    var pageNums = this.testGotoPageNums({twoUp : false, isFXL : false, pageProgDir : "ltr", firstPageOffset : true,
                        current_pages : [3]});
                
                    expect(pageNums).toEqual([2, 3]);
                });

                it("gets 2 page numbers; even page", function () {

                    var pageNums = this.testGotoPageNums({twoUp : false, isFXL : false, pageProgDir : "ltr", firstPageOffset : false,
                        current_pages : [2]});
                
                    expect(pageNums).toEqual([1, 2]);
                });

                it("gets 2 page numbers; even page, offset", function () {

                    var pageNums = this.testGotoPageNums({twoUp : false, isFXL : false, pageProgDir : "ltr", firstPageOffset : true,
                        current_pages : [2]});
                
                    expect(pageNums).toEqual([2, 3]);
                });
            });

            describe("FXL", function () {

                describe("RTL", function () {

                    it("gets 2 page numbers; start p is right, p+1 is left", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [1]});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets 1 page number; start p is right, p+1 is right", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 || pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [1]});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets 1 page number; start p is right, p+1 is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [1]});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets 2 page numbers; start p is left, p-1 is right", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [2]});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets 1 page number; start p is left, p-1 is left", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 || pageNum === 2? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [2]});
                    
                        expect(pageNums).toEqual([2]);
                    });

                    it("gets 1 page number; start p is left, p-1 is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [2]});
                    
                        expect(pageNums).toEqual([2]);
                    });

                    it("gets 1 page number; start p is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 3 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "rtl", firstPageOffset : false,
                            current_pages : [2]});
                    
                        expect(pageNums).toEqual([2]);
                    });
                });

                describe("LTR", function () {

                    it("gets 2 page numbers; start p left, p+1 is right", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [1]});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets 1 page number; start p left, p+1 is left", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 || pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [1]});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets 1 page number; start p left, p+1 is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [1]});
                    
                        expect(pageNums).toEqual([1]);
                    });

                    it("gets 2 page numbers; start p right, p-1 is left", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [2]});
                    
                        expect(pageNums).toEqual([1, 2]);
                    });

                    it("gets 1 page number; start p right, p-1 is right", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 1 || pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [2]});
                    
                        expect(pageNums).toEqual([2]);
                    });

                    it("gets 1 page number; start p right, p-1 is center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [2]});
                    
                        expect(pageNums).toEqual([2]);
                    });

                    it("gets 1 page number; start p center", function () {

                        spyOn(this.pageNumSelector, "displayedPageIsLeft").andCallFake(function (pageNum) {
                            return pageNum === 1 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsCenter").andCallFake(function (pageNum) {
                            return pageNum === 2 ? true : false; });
                        spyOn(this.pageNumSelector, "displayedPageIsRight").andCallFake(function (pageNum) {
                            return pageNum === 3 ? true : false; });

                        var pageNums = this.testGotoPageNums({twoUp : false, isFXL : true, pageProgDir : "ltr", firstPageOffset : false,
                            current_pages : [2]});
                    
                        expect(pageNums).toEqual([2]);
                    });
                });
            });
        });
    });
});