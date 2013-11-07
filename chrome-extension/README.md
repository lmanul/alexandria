# Readium

_an open source library for handling EPUB documents_

Readium is in early beta stages. The goal of the project is to create an open source set of libraries for viewing and developing EPUB 2.0.1 and EPUB 3 content. Currently the project is available as a google chrome extension that enables viewing of EPUB content in the browser. For high-level information see the [Readium Project](http://readium.org/)  website.

## Contributing

Readium is in active development and we are keen to build a community of developers to help make it awesome. If you would like to be invited as a contributor leave a message in the issue tracker or [send Justin an email](mailto:justinh@evidentpoint.com)

## Dependencies

Google Chrome Version 15+


## Install

If you are a developer interested in hacking on the project, clone the repository and then follow the instruction for loading an unpacked extension from the [chrome extensions page](http://code.google.com/chrome/extensions/getstarted.html#load-ext)

If you want to give the latest release a whirl, use the one click install link below to add the extension to chrome.

* [Add To Chrome](http://github.readium.org/releases/readium.crx)

##  Testing

We are using [Jasmine](https://github.com/pivotal/jasmine/wiki) to perform javascript unit tests. The best way to get these running is to install the [Jasmine rubygem](http://rubygems.org/gems/jasmine).

    $ gem install jasmine

Then the specs can be run via the command:

    $ rake jasmine

This will start a webserver running on `port 8888`. To run the specs navigate to (or refresh) `localhost:8888`.


## License
[BSD](https://github.com/readium/readium/blob/master/LICENSE)


## Contributors

* [IDPF](http://idpf.org/)
* [Evident Point Software Corp.](http://www.evidentpoint.com/)
* [Bluefire Productions](http://www.bluefirereader.com/)


## Contact

* justinh@evidentpoint.com


## Download

You can download this project in either [zip](https://github.com/readium/readium/zipball/master) or [tar formats](https://github.com/readium/readium/tarball/master).

You can also clone the project with [Git](http://git-scm.com) by running:

    $ git clone git://github.com/readium/readium


## Attribution

Readium is an open source project, built on top of other open source projects. In addition to Chrome and WebKit, development of Readium would not have been possible without the following projects:

* [jQuery](http://jquery.com/)
* [Backbonejs](http://documentcloud.github.com/backbone/)
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/)
* [Underscorejs](http://documentcloud.github.com/underscore/)
* [Lawnchair](http://westcoastlogic.com/lawnchair/)
* [ZipFile.js](http://cheeso.members.winisp.net/srcview.aspx?dir=js-unzip&file=js-zip.zip)
* [jsUri](http://code.google.com/p/jsuri/)



_See also [Readium Homepage in Github Pages](http://github.readium.org/)._
