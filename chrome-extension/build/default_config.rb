# this file contains configurations for "build.rake". It should not
# be edited directly. Instead create a file in this same dir called
# "custom_config.rb" and override and variables in that file to customize
# the build process.
@config = {}

# name of the directory that contains application scripts
@config[:scripts_dir] = "scripts"

# a list of scripts that should not be compressed durring the build
# process
@config[:exclude_scripts] = ["scripts/libs/plugins.js", "scripts/libs/web_plugins.js"]

# the directory to publish into, the name of this dir will be used by
# chrome as the name of the extension
@config[:publish_dir] = "readium"

# path the closure compiler jar
@config[:cc_jar_path] = "build/tools/closure-compiler-v1346.jar"

# list of files and dirs that need to be copied over to 
# the deploy dir as are with no processing
@config[:simple_copies] = ["background/**/*", "css/viewer_manifest.css", "css/library.css", "images/**/*", "manifest.json", "LICENSE", "_locales/**/*"]

# list of js libraries that need to be copied over (right now these are just simple copies)
@config[:js_libs] = ["lib/jquery-1.7.1.min.js", "lib/mathjax/**/*", "lib/pan_and_zoom.js", "scripts/libs/plugins.js", "scripts/libs/web_plugins.js", "lib/modernizr-2.5.3.min.js", "lib/2.5.3-crypto-sha1.js", "lib/zip.js", "lib/deflate.js", "lib/inflate.js", "lib/epub_cfi.js", "lib/select2.min.js", "lib/images/*"]

# html view files that need to have be processed (scripts) and copied over
@config[:html_files] = ["views/library.html", "views/viewer.html", "index.html", "viewer.html"]

# relative path of where to put the extension's .crx file
@config[:crx_path] = "releases/readium.crx"

# the regular expression used to identify the list of scripts that
# should be concatenated together into one file
@config[:scripts_regex] = /<!-- scripts concatenated and minified via build script -->((?:.|\s)*?)<!-- end scripts -->/

# when the website is generated, all files in the root outside of the root are deleted
# add files to this array to keep them. Basically stuff here is needed by the website but
# not by the crx
@config[:web_keeps] = ["CNAME", "releases", "epub_content", "docs"]