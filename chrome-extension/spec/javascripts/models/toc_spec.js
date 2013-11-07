// var ncx = "";
// ncx += '<?xml version="1.0" encoding="UTF-8"?>'
// ncx += '<ncx xmlns:ncx="http://www.daisy.org/z3986/2005/ncx/" xmlns="http://www.daisy.org/z3986/2005/ncx/"'
// ncx += 'version="2005-1" xml:lang="en">'
// ncx += '<head>'
// ncx += '<meta name="dtb:uid" content="code.google.com.epub-samples.wasteland-basic"/>'
// ncx += '</head>'
// ncx += '<docTitle>'
// ncx += '<text>The Waste Land</text>'
// ncx += '</docTitle>'
// ncx += '<navMap>'
// ncx += '<navPoint id="ch1">'
// ncx += '<navLabel>'
// ncx += '<text>I. THE BURIAL OF THE DEAD</text>'
// ncx += '</navLabel>'
// ncx += '<content src="wasteland-content.xhtml#ch1"/>'
// ncx += '</navPoint>'
// ncx += '<navPoint id="ch2">'
// ncx += '<navLabel>'
// ncx += '<text>II. A GAME OF CHESS</text>'
// ncx += '</navLabel>'
// ncx += '<content src="wasteland-content.xhtml#ch2"/>'
// ncx += '</navPoint>'
// ncx += '<navPoint id="ch3">'
// ncx += '<navLabel>'
// ncx += '<text>III. THE FIRE SERMON</text>'
// ncx += '</navLabel>'
// ncx += '<content src="wasteland-content.xhtml#ch3"/>'
// ncx += '</navPoint>'
// ncx += '<navPoint id="ch4">'
// ncx += '<navLabel>'
// ncx += '<text>IV. DEATH BY WATER</text>'
// ncx += '</navLabel>'
// ncx += '<content src="wasteland-content.xhtml#ch4"/>'
// ncx += '</navPoint>'
// ncx += '<navPoint id="ch5">'
// ncx += '<navLabel>'
// ncx += '<text>V. WHAT THE THUNDER SAID</text>'
// ncx += '</navLabel>'
// ncx += '<content src="wasteland-content.xhtml#ch5"/>'
// ncx += '</navPoint>'
// ncx += '<navPoint id="rearnotes">'
// ncx += '<navLabel>'
// ncx += '<text>NOTES ON "THE WASTE LAND"</text>'
// ncx += '</navLabel>'
// ncx += '<content src="wasteland-content.xhtml#rearnotes"/>'
// ncx += '</navPoint>'
// ncx += '</navMap>'
// ncx += '</ncx>'

// describe("construction an item", function() {
// });

// describe("parsing the ncx", function() {
//     var toc;
//     beforeEach(function() {
//         var ebook = new Readium.Models.EPUBController({"package_doc_path": "banana"});
//         toc = new Readium.Models.NcxToc({book: ebook, file_path: "nowhere"});
//     });

//     it("parses the title", function() {
//         var parsed = toc.parse(ncx);
//         expect(parsed.title).toEqual("The Waste Land");
//     });

//     it("parses all the navPoints", function() {
//         var parsed = toc.parse(ncx);
//         expect(parsed.navs.length).toEqual(6);
//     });

//     it("parses the attrs of the navPoints", function() {
//         var point = toc.parse(ncx).navs[0];
//         expect(point.text).toEqual('I. THE BURIAL OF THE DEAD');
//         expect(point.href).toEqual('wasteland-content.xhtml#ch1');
//     }); 
// });