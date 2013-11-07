describe('PackageDocument', function() {
    
    describe("initialization", function() {

        beforeEach(function() {
            
            stubFileSystem();
            this.packageDocument = new Readium.Models.PackageDocument({
                book: {},
                file_path: "some/path"
            });
        });

        it('exists in the namespace', function() {
            
            expect(Readium.Models.PackageDocument).toBeDefined();
        });
          
        it('subscribes to spine position changed events', function() {
            
            spyOn(this.packageDocument.onSpinePosChanged, "apply");
            this.packageDocument.trigger("change:spine_position");
            expect(this.packageDocument.onSpinePosChanged.apply).toHaveBeenCalled();
        });

    describe("parsing the xml", function() {
        
        beforeEach(function() {

            var xml_string;
            
            xml_string = jasmine.getFixtures().read('package_document.xml');
            this.xml = new window.DOMParser().parseFromString(xml_string, 'text/xml');

            this.packageDocument = new Readium.Models.PackageDocument({
                file_path: "some/path"
            });

            this.packageDocument.uri_obj = new URI("http://google.ca");
            spyOn(this.packageDocument, "crunchSpine");
            this.json = this.packageDocument.parse(this.xml);
        });

        it('is working', function() {
            
            expect($('title', this.xml).text()).toEqual("L'espagnol dans votre poche");
            expect(Jath.resolver).toBeDefined();
            expect(Readium.Collections.ManifestItems).toBeDefined();
        });

        it('parses the spine nodes', function() {
            
            expect(this.json.spine.length).toEqual(3);
        });

        it('parses the manifest', function() {
            
            expect(typeof this.json.manifest).toEqual("object");
        });
    });

    describe("public methods", function () {

        it("assigns page-spread properties to ")

    });
});
