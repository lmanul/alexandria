#!/usr/bin/python
# coding=utf-8

import datetime
import hashlib
import math
import os
import re
import shutil
import subprocess
import sys

from os import listdir
from os.path import isfile, join, getmtime

from models import *

uname = subprocess.check_output(["uname", "-a"])
if uname.lower().find("darwin") != -1:
  is_mac = True
else:
  is_mac = False

LOG = "/tmp/mkebookslog"
os.system("touch " + LOG)

SED_INLINE = "sed -i"
if is_mac:
  SED_INLINE = "sed -i bup"

all_footnotes = []

class OutputType:
  EPUB = 0
  COVER = 1
  ITUNES = 2
  KINDLE = 3

class Footnote:
  def __init__(self, text, counter, owner, html_file):
    self.text = text
    self.counter = counter
    self.owner = owner
    self.html_file = html_file

  def get_id(self):
    return 'fn-' + self.owner.get_string_id() + '-' + str(self.counter)

  def __str__(self):
    return "[Footnote #" + str(self.counter) + " in " + self.html_file + ": '" + \
        self.text[0:15] + "...']"

class TocChapter:
  def __init__(self, level, title, parent, filename, id):
    self.level = level
    self.title = title
    self.children = []
    self.parent = parent
    self.filename = filename
    self.id = id
    self.footnotes = []

  def __str__(self):
    retval = "[" + str(self.level) + ", '" + self.title + "'"
    if len(self.footnotes) > 0:
      retval += ' (' + str(len(self.footnotes)) + ' footnotes) '
    if len(self.children) > 0:
      retval += " > "
    for child in self.children:
      retval += child.__str__()
    retval += "]"
    return retval

  def get_string_id(self):
    return "c" + str(self.level) + "-" + str(self.id)

  def get_table_of_contents(self):
    toc = ""
    if self.title != "":
      toc += '\n<li style="margin-left: %s em"><a href="Text/%s#%s">%s</a>' % \
          (str(self.level), self.filename, self.get_string_id(), self.title)
    if len(self.children) > 0:
      toc += "\n<ol>"
    for child in self.children:
      toc += child.get_table_of_contents()
    if len(self.children) > 0:
      toc += "\n</ol>"
    if self.title != "":
      toc += '</li>'
    return toc

  def get_footnotes(self):
    footnotes_content = ""
    if self.level == 1 and self.title != "" and self.has_footnotes():
      footnotes_content += '\n\n<h2 class="footnote-section">' + self.title + '</h2>'
    for footnote in self.footnotes:
      footnotes_content += '\n<aside epub:type="footnote" id="' + footnote.get_id() + '-popup"><a id="' + footnote.get_id() + '" href="' + footnote.html_file + \
            '#' + footnote.get_id() + '">' + \
            str(footnote.counter) + '</a>. ' + \
            footnote.text + "</aside>"
    for child in self.children:
      footnotes_content += child.get_footnotes()
    return footnotes_content

  def has_footnotes(self):
    if len(self.footnotes) > 0:
      return True
    for child in self.children:
      if child.has_footnotes():
        return True
    return False

def now_seconds():
  return int(datetime.datetime.now().strftime("%s"))

# Find where the common files are.
script_dir = os.path.dirname(os.path.realpath(__file__))
pathToCommon = script_dir + "/"
maxLevels = 20

levels = 0
while not os.path.exists(pathToCommon) and levels < maxLevels:
  pathToCommon = join("..", pathToCommon)
  levels = levels + 1


# Some constants throughout the script.
COVER_HEIGHT = 2000
COVER_HEIGHT_FOR_ITUNES = 2500
DISCLAIMER_PATH = "Text/00000_disclaimer.html"
EPUB_CHECKER_VERSION = "3.0.1"
EPUB_CHECKER = "epubchecker/epubcheck-" + EPUB_CHECKER_VERSION + ".jar"
EPUB_CHECKER_FULL_JAR_PATH = "epubchecker/epubcheck-" + EPUB_CHECKER_VERSION + \
    ".jar/epubcheck-" + EPUB_CHECKER_VERSION + ".jar"
FOOTNOTES_HTML_FILE_NAME = "9999_footnotes.html"
FOOTNOTE_REGEX = re.compile(r'<footnote>(?P<content>.*?)</footnote>', re.S | re.M)
INDEX_REGEX = re.compile(r'<index>(?P<content>.*?)</index>', re.S)
STYLE_FILE_BASE_NAME = "style.css"
STYLES_PATH = "book/OEBPS/Styles/" + STYLE_FILE_BASE_NAME
TOC_PATH = "book/OEBPS/toc.xhtml"
JAVA = "java"
if os.path.exists("/usr/lib/jvm/java-6-openjdk-amd64/jre/bin/java"):
  JAVA = "/usr/lib/jvm/java-6-openjdk-amd64/jre/bin/java"

pathToTemplates = join(pathToCommon, "templates")
htmlHeaderHandle = open(join(pathToTemplates, "html_header.txt"), "r")
htmlFooterHandle = open(join(pathToTemplates, "html_footer.txt"), "r")
contentOpfHandle = open(join(pathToTemplates, "content_opf.txt"), "r")

htmlHeader = htmlHeaderHandle.read()
htmlFooter = htmlFooterHandle.read()
contentOpf = contentOpfHandle.read()


def dependency_inputs_for_output_type(type, htmlFiles, imageFiles, pathToCommon,
    pathToTemplates):
  dependencies = []
  dependencies.append("config.ebook")
  dependencies.append("cover.svg")
  dependencies.append(join(pathToCommon, "mkebook.py"))
  dependencies.append(join(pathToCommon, "alexandria_logo.png"))
  dependencies.append(join(pathToCommon, "alexandria_logo_with_text.png"))
  dependencies.append(join(pathToCommon, "style.css"))
  for font in os.listdir(os.path.join(pathToCommon, "fonts")):
    dependencies.append(os.path.join(pathToCommon, "fonts", font))
  if type == OutputType.EPUB or type == OutputType.KINDLE:
    dependencies.append(STYLE_FILE_BASE_NAME)
    for file in htmlFiles:
      dependencies.append(join("Text/", file))
    for file in imageFiles:
      dependencies.append(join("Images/", file))
  if type == OutputType.COVER:
    dependencies.append("Cover.jpg")
  for template in os.listdir(pathToTemplates):
    if not template.endswith("~"):
      if template.endswith("txt") and type == OutputType.EPUB:
        dependencies.append(os.path.join(pathToTemplates, template))
      if template.endswith("svg"):
        dependencies.append(os.path.join(pathToTemplates, template))
  if type == OutputType.ITUNES:
    dependencies.append(os.path.join(
        pathToTemplates, "itunes_producer_metadata.xml"))
  if type == OutputType.EPUB or type == OutputType.KINDLE:
    dependencies.append(os.path.join(pathToCommon, "models.py"))
  return dependencies


def getLatestInputModTime(type, htmlFiles, imageFiles, pathToCommon,
    pathToTemplates, debug):
  dependencies = dependency_inputs_for_output_type(type, htmlFiles,
      imageFiles, pathToCommon, pathToTemplates)
  latestInputModTime = 0
  latestInput = ""

  for input in dependencies:
    # Ignore generated files.
    if input == DISCLAIMER_PATH:
      continue
    if os.path.exists(input):
      mTime = os.path.getmtime(input)
      if mTime > latestInputModTime:
        latestInputModTime = mTime
        latestInput = input
  if debug:
    print "Latest input is " + latestInput

  return latestInputModTime


def downloadToolsIfNeeded(pathToCommon):
  cwd = os.getcwd()
  os.chdir(pathToCommon)
  if not os.path.exists("epubchecker"):
    os.system("mkdir epubchecker")
  if not os.path.exists(EPUB_CHECKER):
    fileNameBase = "epubcheck-" + EPUB_CHECKER_VERSION
    fileName = fileNameBase + ".zip"
    url = "https://github.com/IDPF/epubcheck/releases/download/v" + \
        EPUB_CHECKER_VERSION + "/" + fileName
    print "I need to download epubcheck, please be patient..."
    os.system("wget \"" + url + "\"")
    os.system("unzip " + fileName)
    os.system("mv " + fileNameBase + " " + EPUB_CHECKER)
    os.system("rm -rf " + fileNameBase + "*")
  os.chdir(cwd)

  # TODO: Also download kindlegen.
  # http://kindlegen.s3.amazonaws.com/kindlegen_linux_2.6_i386_v2_9.tar.gz
  # http://kindlegen.s3.amazonaws.com/KindleGen_Mac_i386_v2_9.zip


def listHtmlFiles():
  htmlFiles = [ f for f in listdir("Text/") if isfile(join("Text/", f)) and \
      f.endswith(".html") ]
  htmlFiles.sort()
  return htmlFiles


def listImageFiles():
  if os.path.exists("Images/"):
    imageFiles = [ i for i in listdir("Images/") if \
        isfile(join("Images/", i)) ]
  else:
    imageFiles = []
  return imageFiles


def read_configuration_file():
  configFile = open("config.ebook", "r")
  configString = configFile.read()
  configItems = configString.split("\n")
  config = {}
  for configItem in configItems:
    if configItem.startswith("#"):
      continue
    if ":" in configItem:
      configItem = configItem.strip()
      keyAndValue = configItem.split(":", 1)
      config[keyAndValue[0]] = keyAndValue[1]
  return config

def needsBuilding(type, force, htmlFiles, imageFiles, pathToCommon,
    pathToTemplate, config, itunes_vendor_id, debug):

  if type == OutputType.COVER and os.path.exists("Cover_manual.png"):
    return False

  if force:
    return True

  latestInputModTime = getLatestInputModTime(type, htmlFiles, imageFiles,
      pathToCommon, pathToTemplates, debug)
  if type == OutputType.EPUB:
    output = config["filename"] + ".epub"
  elif type == OutputType.COVER:
    output = "Cover.png"
  elif type == OutputType.KINDLE:
    output = config["filename"] + ".mobi"
  elif type == OutputType.ITUNES:
    output = itunes_vendor_id + ".itmsp/metadata.xml"
  if debug:
    print "Checking if output exists: " + os.getcwd() + "/" + output
  if not os.path.exists(output):
    if debug:
      print "Output doesn't exist"
    return True
  output_mod_time = os.path.getmtime(output)
  if debug:
    print "Output does exist, mod time is " + str(output_mod_time) + " and " + \
        "latest input mod time is " + str(latestInputModTime)
  return output_mod_time <= latestInputModTime


def copyCommonFiles(pathToCommon):

  os.system("mkdir -p book/OEBPS/Images")
  os.system("cp " + pathToCommon + "alexandria_logo.png book/OEBPS/Images/")

  # Common styles
  os.system("mkdir -p book/OEBPS/Styles/")
  os.system("cp " + pathToCommon + "style.css " + STYLES_PATH)

  # Files needed for epub
  os.system("mkdir -p book/META-INF")
  os.system("cp " + pathToCommon + "epub_artifacts/container.xml book/META-INF/")
  os.system("cp " + pathToCommon + "epub_artifacts/mimetype book/")

  # Also copy local images.
  if os.path.exists("Images") and os.listdir("Images") != []:
    os.system("cp Images/* book/OEBPS/Images/")


def prepend_disclaimer(lang, publisher):
  if publisher != 'Alexandria':
    return
  disclaimer_file_path = os.path.join(pathToTemplates,
      "alexandria_" + lang + ".txt")
  if os.path.exists(disclaimer_file_path):
    os.system("cp " + disclaimer_file_path + " " + DISCLAIMER_PATH)

def removeUnusedImages(image_files, html_files):
  used_image_files = []
  unused_image_files = []
  corpus = ""
  for html_file in html_files:
    handle = open(os.path.join("book/OEBPS/Text", html_file), "r")
    corpus += handle.read()
  for image_file in image_files:
    is_used = image_file in corpus or image_file == "Cover.png"
    if is_used:
      used_image_files.append(image_file)
    else:
      unused_image_files.append(image_file)
      os.system("rm " + os.path.join("book/OEBPS/Images", image_file))
  if len(unused_image_files) != 0:
    print "The following images don't seem to be used and have been " + \
        "removed from the generated ebooks: " + str(unused_image_files)
  return used_image_files

def appendLanguageDependentStyles(language):
  handle = open(STYLES_PATH, "a")
  styles = ""
  if language == "fre":
    styles = styles + """p {text-indent: 1.5em;}\n\n"""
  else:
    styles = styles + """p + p {text-indent: 1.5em;}\n\n"""
  handle.write(styles)
  handle.close()  

def appendLocalStyles():
  if os.path.exists("style.css"):
    os.system("cat style.css >> " + STYLES_PATH)


def get_base64_data(file_path):
  return subprocess.check_output(["base64", file_path])


def one_title_part(text, x, y):
  title_part_template = '<tspan x="%s" y="%s" width="66900">%s</tspan>'
  return title_part_template % (str(x), str(y), text)

def max_length(words):
  the_max = 0
  for word in words:
    the_max = max(the_max, len(word))
  return the_max

def rasterizeCover(title, author, filename, debug):
  start = now_seconds()
  coverPath = "cover.svg"
  if os.path.exists(coverPath):
    coverToRasterize = coverPath
  else:
    coverTemplatePath =  join(pathToTemplates, "cover.svg")
    coverTemplateHandle = open(coverTemplatePath, "r")
    populatedCoverPath = "cover_populated.svg"
    populatedCoverHandle = open(populatedCoverPath, "w")

    title_part_template = '<tspan x="{{X}}" y="{{Y}}" width="66900">{{PART}}</tspan>'
    if len(title) <= 10:
      n_lines = 1
    elif len(title) <= 40:
      n_lines = 2
    else:
      n_lines = 3

    if n_lines == 1:
      title_parts = one_title_part(title, 33450, 17500)
      max_line_length = len(title)
    else:
      title_words = title.split(" ")
      if n_lines == 2:
        half_pos = int(math.floor(len(title_words) / 2))
        first_half = " ".join(title_words[0:half_pos])
        second_half = " ".join(title_words[half_pos:])
        title_parts = one_title_part(first_half, 33450, 10500) + \
            one_title_part(second_half, 33450, 20500)
        max_line_length = max_length([first_half, second_half])
      elif n_lines == 3:
        one_third = int(math.floor(len(title_words) / 3))
        first_third = " ".join(title_words[0:one_third])
        second_third = " ".join(title_words[one_third:(2*one_third)])
        third_third = " ".join(title_words[(2*one_third):])
        title_parts = one_title_part(first_third, 33450, 8000) + \
            one_title_part(second_third, 33450, 14500) + \
            one_title_part(third_third, 33450, 21000)
        max_line_length = max_length([first_third, second_third, third_third])

      
    title_font_size = 25000 / math.sqrt(max_line_length)

    coverTemplateData = coverTemplateHandle.read()
    coverTemplateData = coverTemplateData.replace("{{AUTHOR}}", author)
    coverTemplateData = coverTemplateData.replace("{{TITLE_FONT_SIZE}}", str(title_font_size))
    coverTemplateData = coverTemplateData.replace("{{TITLE_PARTS}}", title_parts)
    # TODO: Make this configurable
    fontFamily = "Montaga"
    ttfFontPath = join(pathToCommon, "fonts", fontFamily + ".ttf")
    svgFontPath = join(pathToCommon, "fonts", fontFamily + ".svg")
    os.system(JAVA + " -jar " + \
        join(pathToCommon, "batik", "batik-ttf2svg.jar") + \
        " " + ttfFontPath + " -autorange -id " + fontFamily + " -o " + svgFontPath + \
        " 2>> " + LOG + " >> " + LOG)
    os.system(SED_INLINE + " '1d' " + svgFontPath)
    os.system(SED_INLINE + " '$d' " + svgFontPath)
    svgFontHandle = open(svgFontPath, "r")
    svgFontData = svgFontHandle.read()
    # TODO: Make this configurable
    imageName = "Cover.jpg"
    if not os.path.exists(imageName):
      return
    imageBase64 = get_base64_data(imageName)
    coverTemplateData = coverTemplateData.replace("{{FONT_FAMILY}}",
        fontFamily)
    coverTemplateData = coverTemplateData.replace("{{SVG_FONT}}", svgFontData)
    coverTemplateData = coverTemplateData.replace("{{IMAGE_BASE64_DATA}}",
        imageBase64.replace("\n", " "))
    populatedCoverHandle.write(coverTemplateData)
    populatedCoverHandle.close()
    coverToRasterize = populatedCoverPath
    os.system("rm -f " + svgFontPath)
  
  if is_mac:
    os.system(JAVA + " -jar " + \
        join(pathToCommon, "batik", "batik-rasterizer.jar " + \
        "-h " + str(COVER_HEIGHT) + " -d book/OEBPS/Images/Cover.png " + coverToRasterize + \
        " 2>> " + LOG + " >> " + LOG))
  else:
    os.system("rsvg-convert -o book/OEBPS/Images/Cover.png -h " + str(COVER_HEIGHT) + " " + coverToRasterize)
  # Also copy the cover locally.
  os.system("cp book/OEBPS/Images/Cover.png .")

  if os.path.exists("/usr/bin/convert"):
    size = str(COVER_HEIGHT_FOR_ITUNES)
    command = "convert -size " + size + "x" + size + " Cover.png -resize " + \
        size + "x" + size + ' +profile "*" Cover_iTunes.png'
    if debug:
      print command
    os.system(command)
  else:
    os.system(JAVA + " -jar " + \
        join(pathToCommon, "batik", "batik-rasterizer.jar " + \
        "-h " + str(COVER_HEIGHT_FOR_ITUNES) + " -d ./Cover_iTunes.png " + coverToRasterize + \
        " 2>> " + LOG + " >> " + LOG))

  if not os.path.exists(coverPath):
    # Cleanup the populated cover
    if not debug:
      os.system("rm " + populatedCoverPath)
  print "    ✓ Cover (" + str(now_seconds() - start) + "s)"

def gather_index(htmlFiles):
  # TODO
  dummy = 2

def generateContentOpf(config, imageFiles, htmlFiles, hasFootnotes):

  opfPath = "book/OEBPS/content.opf"
  opfHandle = open(opfPath, "w")
  opf = contentOpf \
      % (config["uuid"], config["title"], config["author"], config["lang"],
         config["date"])

  for image in imageFiles:
    if image == "Cover.png":
      continue
    parts = image.split(".")
    extension = parts[len(parts) - 1]
    # The image name ends up in an "ID" tag, where some characters aren't
    # allowed and it must not start with a number.
    imageId = "i" + image.translate(None, ":");
    if extension == 'jpg':
      extension = 'jpeg'
    opf += '    <item id="' + imageId + '" href="Images/' + image + '" media-type="image/' + extension + '"/>\n'

  for htmlFile in htmlFiles:
    name = htmlFile.split(".", 2)[0]
    opf += '    <item href="Text/' + htmlFile + '" id="t' + \
        name + '" media-type="application/xhtml+xml" />\n'


  opf += """    <item href="Styles/style.css" id="style.css" media-type="text/css" />
  </manifest>
  <spine>
    <itemref idref="titlepage.xhtml" />\n"""

  for htmlFile in htmlFiles:
    name = htmlFile.split(".", 2)[0]
    opf += '    <itemref idref="t' + name + '" />\n'

  opf += """  </spine>\n</package>\n"""

  opfHandle.write(opf)
  opfHandle.close()


def build_chapter_structure(html_files, options):
  root = TocChapter(0, "", None, "", "")
  current = root
  id_counter = {}
  footnote_counter = 1
  for html_file in html_files:
    handle = open("Text/" + html_file, "r")
    content = handle.read()
    current_footnote = ""
    lines = content.split("\n")
    for line in lines:
      # Restore a space at the end instead of the line break.
      line += " "
      matched = re.search(r"<h(.)>(.*)</h.>", line)
      if matched:
        level = int(matched.group(1))
        title = matched.group(2)
        if str(level) not in id_counter:
          id_counter[str(level)] = 1
        else:
          id_counter[str(level)] += 1
        if level <= current.level:
          while current.level >= level:
            current = current.parent
        child = TocChapter(level, title, current, html_file, id_counter[str(level)])
        current.children.append(child)
        current = child
      # TODO: Handle footnote ending on same line as another starts.
      footnote_start_matches = re.search(r"<footnote>(.*)", line)
      footnote_end_matches = re.search(r"(.*)</footnote>", line)
      footnote_start_then_end_matches = re.search(r"<footnote>(.*)</footnote>", line)
      if footnote_start_then_end_matches:
        whole_footnote = re.search(r"<footnote>(.*)</footnote>", line)
        current_footnote = whole_footnote.group(1)
        # print "Found whole footnote group " + str(footnote_counter)
        footnote = Footnote(current_footnote, footnote_counter, current, html_file)
        current.footnotes.append(footnote)
        #if options.debug:
        #  print "Found single-line footnote: " + str(footnote)
        all_footnotes.append(footnote)
        footnote_counter += 1
        current_footnote = ""
      elif footnote_start_matches and not footnote_end_matches:
        # print "Only footnote start"
        current_footnote = footnote_start_matches.group(1)
      elif footnote_end_matches:
        # print "footnote end matches"
        # print current_footnote
        current_footnote += footnote_end_matches.group(1)
        # print "..and.."
        # print current_footnote
        footnote = Footnote(current_footnote, footnote_counter, current, html_file)
        current.footnotes.append(footnote)
        #if options.debug:
        #  print "Found multi-line footnote: " + str(footnote)
        all_footnotes.append(footnote)
        footnote_counter += 1
        current_footnote = ""
      elif current_footnote != "":
        current_footnote += line
  # print root
  return root

def preprocess_html(pathToCommon, htmlFiles, language, options):
  if not os.path.exists("book/OEBPS/Text"):
    os.system("mkdir -p book/OEBPS/Text")

  htmlFileCounter = 1
  current_chapter = None
  id_counter = {}
  metadata = build_chapter_structure(htmlFiles, options)
  for htmlFile in htmlFiles:
    manual_file = open("Text/" + htmlFile, "r")
    manual_content = manual_file.read()
    manual_content = fix_punctuation(manual_content, language)
    manual_file.close()
    manual_content_lines = manual_content.split("\n")
    manual_content = ""
    for line in manual_content_lines:
      processed_line = line
      matched = re.search(r"<h(.)>(.*)</h.>", processed_line)
      if matched:
        level = matched.group(1)
        title = matched.group(2)
        if str(level) not in id_counter:
          id_counter[str(level)] = 1
        else:
          id_counter[str(level)] += 1
        processed_line = re.sub(r"(<h.>)", r'\1<a id="c' + str(level) + \
            '-' + str(id_counter[str(level)]) + '" />', processed_line)
      manual_content += processed_line + "\n"
    generatedFile = open("book/OEBPS/Text/" + htmlFile, "w")
    generatedContent = manual_content.strip()
    if not generatedContent.startswith("<h"):
      generatedContent = "<p>" + generatedContent
    # Add a closing paragraph character at the end of paragraphs
    generatedContent = re.sub(r'\s*(\n\s*){2,}', "</p>\n\n", generatedContent)
    # Add an opening paragraph character at the start of paragraphs
    generatedContent = re.sub(r'\s*(\n\s*){2,}', "\n\n<p>", generatedContent)

    generatedContent = '<div class="chapter-mark"></div>\n' + generatedContent
    generatedContent = re.sub(r'<tocchapter>.*?</tocchapter>', "",
        generatedContent)
    
    results = re.search(FOOTNOTE_REGEX, generatedContent)
    while results:
      footnote = all_footnotes.pop(0)
      footnote_id = footnote.get_id()
      caller = '<a epub:type="noteref" href="' + \
          FOOTNOTES_HTML_FILE_NAME + '#' + \
          footnote_id + '-popup" id="' + footnote_id + '"><sup>' + str(footnote.counter) + \
          '</sup></a>'
      replacement = caller
      generatedContent = re.sub(FOOTNOTE_REGEX, replacement, generatedContent, 1)
      results = re.search(FOOTNOTE_REGEX, generatedContent)
     # TODO: Handle the index.
    #while re.search(INDEX_REGEX, generatedContent):
    generatedContent = re.sub(r"<index>.*?</index>", "", generatedContent)
    generatedContent = htmlHeader + "\n" + generatedContent + htmlFooter
    generatedContent = postProcessHtml(generatedContent)

    generatedFile.write(generatedContent)
    generatedFile.close()
    htmlFileCounter = htmlFileCounter + 1

  return metadata


def postProcessHtml(input):
  output = input
  # Remove possibly mistakenly introduced <p> and </p> tags.
  output = re.sub(r'</h(.)></p>', '</h\\1>', output)
  output = re.sub(r'<p><h', '<h', output)
  output = re.sub(r'<p>\s*<p', '<p', output)
  output = re.sub(r'</p>\s*</p>', '</p>', output)
  output = re.sub(r'</aside></p>', '</aside>', output)
  # Assume paragraphs starting with an image don't want indent.
  output = re.sub(r'<p><img', '<p class="noindent"><img', output)
  output = re.sub("<p><div", "<div", output)
  output = re.sub("<p><ul", "<ul", output)
  output = re.sub("<p><ol", "<ol", output)
  output = re.sub("<ul></p>", "<ul>", output)
  output = re.sub("<ol></p>", "<ol>", output)
  output = re.sub("<p></div></p>", "</div>", output)
  output = re.sub("<p></ul></p>", "</ul>", output)
  output = re.sub("<p></ol></p>", "</ol>", output)
  output = re.sub("</div></p>", "</div>", output)
  output = re.sub("</ul></p>", "</ul>", output)
  output = re.sub("</ol></p>", "</ol>", output)
  output = re.sub("<p><li>", "<li>", output)
  output = re.sub("</li></p>", "</li>", output)
  return output


def generate_footnotes(metadata, htmlHeader, htmlFooter):

  footnotesFile = open("book/OEBPS/Text/" + FOOTNOTES_HTML_FILE_NAME, "w")
  footnotesContent = '<h1 class="footnotes_title">' + 'Notes' + '</h1>'
  footnotesContent += metadata.get_footnotes()
  footnotesContent = htmlHeader + "\n" + footnotesContent + htmlFooter
  footnotesContent = postProcessHtml(footnotesContent)
  footnotesFile.write(footnotesContent)
  footnotesFile.close()


def generate_table_of_contents(metadata, config):
  tocHandle = open(TOC_PATH, "w")
  tocNcxHandle = open(join(pathToTemplates, "toc_ncx.txt"), "r")
  tocNcx = tocNcxHandle.read()

  tocInnerContent = metadata.get_table_of_contents()
  tocTitle = "Contents"
  if config["lang"] == "fre":
    tocTitle = "Table des matières"

  tocContent = tocNcx % (config["title"], config["uuid"], tocTitle, tocInnerContent)

  tocHandle.write(tocContent)
  tocHandle.close()

def generateTitlePage(config):
  titlePagePath = "book/OEBPS/Text/titlepage.xhtml"
  titlePageHandle = open(titlePagePath, "w")

  publisherText = ""
  if "publisher" in config and config["publisher"] != "None":
    publisherText = ""
  elif config["publisher"] == "Alexandria":
    publisherText = """
      <div class="logo">
      <img src="../Images/alexandria_logo.png" alt="Alexandria Logo" />
      <br />
      Alexandria
      <br />
      <span>www.alexandria-project.net</span>
    </div>
  """

  author_titles = ""
  if "author-titles" in config:
    author_titles = '<div class="author-titles">' + config["author-titles"] + \
        '</div>'
  subtitle = ""
  if "subtitle" in config:
    subtitle = config["subtitle"]

  titlePage = """<?xml version="1.0" encoding="utf-8" standalone="no"?>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>%s</title>
  <link href="../Styles/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
  <div class="title">%s</div>
  <div class="subtitle">%s</div>
  <div class="author">%s</div>
  %s
  %s
</body>
</html>
""" % (config["title"], config["title"], subtitle, config["author"], author_titles,
       publisherText)

  titlePageHandle.write(titlePage)
  titlePageHandle.close()


def fix_punctuation(input, language):
  if language == "fre":
    input_lines = input.split("\n")
    regexps = []
    nonBreakingSpaceBeforeNormalSpaceAfter = [
      r"?",
      r"!",
      r";",
      r":",
      r"»",
    ]
    normalSpaceBeforeNonBreakingSpaceAfter = [
      r"«",
    ]
    nonBreakingSpaceOnBothSides = [
      r"—",
    ]

    # TODO: things to display a warning for:
    # * "- "
    # * "A "
    #
    # Also to fix: guillemets puis \n
    # Quand il y a plusieurs espaces à la suite.
    # Guillemet fermant puis ) -- et le parallele
    # - puis \n

    postFixes = [
      [r"»\s*,", r"»,"],
      [r"»\s*\.", r"»."],
      [r"!\s*,", r"!,"],
      [r"\?\s*,", r"?,"],
      [r"!\s*\.", r"!."],
      [r"\?\s*\.", r"?."],
      # No need for the special "three dots" character.
      [r"…", r"..."],
      #  ["<p>\s*", "<p>"],
      #  [\s + "*" + "<p>", "<"],
      [r"^\s*", r""],
      # Fix HTML entities.
      [r"(&[^;\s]*) ;", r"\1;"],
      # Fix space between quotes and parentheses, and colons and parenttheses.
      [r"»\s*\)", r"»)"],
      [r"\(\s*«", r"(«"],
      [r"\"\s*\)", r"\")"],
      [r":\s*\)", r":)"],
      [r"\(\s*\"", r"(\""],
      # Fix space between several "!" and "?"
      [r"\?\s*\?", r"??"],
      [r"!\s*!", r"!!"],
      [r"\?\s*!", r"?!"],
      [r"!\s*\?", r"!?"],
      # Fix space between an apostrophy and an opening quote
      [r"'\s*«", r"'«"],
      # Fix space after a punctuation and before closing paren.
      [r"\?\s*\)", r"?)"],
      [r"!\s*\)", r"!)"],
      [r"\.\s*\)", r".)"],
    ]

    polishes = [
      # Spaces at the end of a line
      [r"\s*$", ""],
      # De-dupe unbreakable spaces.
      [r"  ", " "],
    ]

    punctuations_to_escape = [r"?", r":"]
    backslash = '\\'

    for punctuation in nonBreakingSpaceBeforeNormalSpaceAfter:
      if punctuation in punctuations_to_escape:
        punctuation_escaped = backslash + punctuation
      else:
        punctuation_escaped = punctuation
      regexp = [r'\s*' + punctuation_escaped + r'\s*', r' ' + punctuation + r' ']
      regexps.append(regexp)

    for punctuation in normalSpaceBeforeNonBreakingSpaceAfter:
      if punctuation in punctuations_to_escape:
        punctuation_escaped = backslash + punctuation
      else:
        punctuation_escaped = punctuation
      regexp = [r'\s*' + punctuation_escaped + r'\s*', r' ' + punctuation + r' ']
      regexps.append(regexp)

    for punctuation in nonBreakingSpaceOnBothSides:
      if punctuation in punctuations_to_escape:
        punctuation_escaped = backslash + punctuation
      else:
        punctuation_escaped = punctuation
      regexp = [r'\s*' + punctuation_escaped + r'\s*', r' ' + punctuation + r' ']
      regexps.append(regexp)

    for postFix in postFixes:
      regexps.append(postFix)

    for polish in polishes:
      regexps.append(polish)

    # It's better to apply punctuation fixes line by line.
    output = ""
    for input_line in input_lines:
      line = input_line
      for regexp in regexps:
        line = re.sub(regexp[0], regexp[1], line)
      output += line + "\n"
  else:
    output = input
  return output


def generateEpub(filename):
  start = now_seconds()
  os.chdir("book")
  # TODO: Use proper Python-style wildcards.
  os.system("rm -f OEBPS/*~ META-INF/*~ OEBPS/Text/*~ OEBPS/Styles/*~")
  os.system("rm -f OEBPS/.DS_Store META_INF/.DS_Store")
  os.system("zip -q -X -r -Z store " + filename + ".zip mimetype META-INF OEBPS")
  try:
    os.remove(filename + ".epub")
  except OSError:
    pass
  os.system("mv " + filename + ".zip ../" + filename + ".epub")
  os.chdir("..")
  print "    ✓ ePub (" + str(now_seconds() - start) + "s)" 


def checkEpub(pathToCommon, filename):
  start = now_seconds()
  args = [JAVA, "-jar", pathToCommon + EPUB_CHECKER_FULL_JAR_PATH,
      filename + ".epub"]
  proc = subprocess.Popen(" ".join(args), stdout=subprocess.PIPE,
      stderr=subprocess.PIPE, shell=True)
  (out, err) = proc.communicate()
  if "No errors or warnings detected." not in out:
    print "The epub checker found some problems:\n"
    errors = err.strip().split("\n")
    for error in errors:
      error = error.strip()
      if error != "":
        matches = re.compile(
            r'.*\.epub/(?P<filepath>.*)\((?P<line>\d*),(?P<column>\d*)\):.*').finditer(
                 error)
        has_expected_format = False
        for match in matches:
          has_expected_format = True
          filepath = match.group("filepath")
          line = int(match.group("line"))
          column = int(match.group("column"))
          os.system("sed -n '" + str(line) + "p' book/" + filepath)
          for i in range(0, column):
            print " ",
          print "^"
          print "--------------------------------------------------------------------------------"
          print error
        if not has_expected_format:
          print error
  print "    ✓ ePub validation (" + str(now_seconds() - start) + "s)"

def md5Checksum(filePath):
    with open(filePath, 'rb') as fh:
        m = hashlib.md5()
        while True:
            data = fh.read(8192)
            if not data:
                break
            m.update(data)
        return m.hexdigest()

def generate_itunes_producer_file(title, subtitle, author, author_sort_name,
        description, publisher, date, language, file_name, itunes_vendor_id,
        category):
  start = now_seconds()
  epub_filename = file_name + ".epub"
  epub_size = os.path.getsize(epub_filename)
  epub_md5 = md5Checksum(epub_filename)
  cover_path = "Cover_iTunes.png"
  cover_size = os.path.getsize(cover_path)
  cover_md5 = md5Checksum(cover_path)
  sales_start_date = date
  bc = False
  if date.startswith("-"):
    bc = True
    sales_start_date = sales_start_date[1:]
  sales_start_date_parts = sales_start_date.split("-")
  year = int(sales_start_date_parts[0])
  if bc:
    year = 0 - year
  if year < 1900:
    sales_start_date = "1900-01-01"
  # Now manage categories
  categories_xml = ""
  if category != "":
    categories_dict = {}
    categories_reference = open(os.path.join(pathToCommon, "categories.data"), "r").read()
    categories = categories_reference.split("\n")
    for one_category in categories:
      if ":" not in one_category:
        continue
      (category_key, category_numbers) = one_category.split(":")
      categories_dict[category_key] = []
      category_types = category_numbers.split("|")
      for one_category_type in category_types:
        (category_type, category_number) = one_category_type.split(",")
        categories_dict[category_key].append([category_type, category_number])
    if category in categories_dict:
      for category_type in categories_dict[category]:
        categories_xml += '<subject primary="true" scheme="' + \
            category_type[0] + '">' + category_type[1] + '</subject>'
      
  template_path = os.path.join(pathToTemplates, "itunes_producer_metadata.xml")
  template = open(template_path, "r").read()
  template = template.replace("{{ITUNES_VENDOR_ID}}", itunes_vendor_id)
  template = template.replace("{{TITLE}}", title)
  template = template.replace("{{SUBTITLE}}", subtitle)
  template = template.replace("{{SUBJECTS}}", categories_xml)
  template = template.replace("{{AUTHOR}}", author)
  template = template.replace("{{AUTHOR_SORT_NAME}}", author_sort_name)
  template = template.replace("{{PUBLISHER}}", publisher)
  template = template.replace("{{DESCRIPTION}}", description)
  template = template.replace("{{DATE}}", date)
  template = template.replace("{{SALES_START_DATE}}", sales_start_date)
  template = template.replace("{{LANGUAGE}}", language)
  template = template.replace("{{COVER_IMG_SIZE}}", str(cover_size))
  template = template.replace("{{COVER_IMG_MD5}}", cover_md5)
  template = template.replace("{{EPUB_FILENAME}}", epub_filename)
  template = template.replace("{{EPUB_SIZE}}", str(epub_size))
  template = template.replace("{{EPUB_MD5}}", epub_md5)
  itunes_producer_dir = itunes_vendor_id + ".itmsp"
  os.system("rm -rf " + itunes_producer_dir + " && mkdir " + itunes_producer_dir)
  metadata = open(os.path.join(itunes_producer_dir, "metadata.xml"), "w")
  metadata.write(template)
  metadata.close()
  os.system("cp Cover_iTunes.png " + itunes_producer_dir + "/Cover.png")
  os.system("cp " + epub_filename + " " + itunes_producer_dir + "/")
  print "    ✓ iTunes producer (" + str(now_seconds() - start) + "s)"

def generateMobi(pathToCommon, filename):
  start = now_seconds()
  uname = subprocess.check_output(["uname", "-a"])
  if uname.lower().find("darwin") != -1:
    # print "This is Mac OS X, generating Kindle file..."
    kindleGen = pathToCommon + "kindlegen/mac/kindlegen"
  else:
    # print "This is Linux, generating Kindle file..."
    kindleGen = pathToCommon + "kindlegen/linux/kindlegen"
  os.system(kindleGen + " " + filename + ".epub " + \
      # Remove everything that's not helpful in the output.
      "| grep -v 'Info(' " + \
      "| grep -v '\*\*\*\*\*' " + \
      "| grep -v 'Amazon kindlegen' " + \
      "| grep -v 'A command line' " + \
      "| grep -v 'Copyright Amazon.com' " + \
      # Remove blank lines too.
      "| grep -v -e '^$'")
  print "    ✓ Kindle (" + str(now_seconds() - start) + "s)"

def generate_kindle_cover():
  os.system("mkjpg Cover_iTunes.png")
  os.system("mv Cover_iTunes.jpg Cover_Amazon.jpg")

def clean_up():
  # There should be nothing of value inside "book".
  shutil.rmtree("book", True)
  if os.path.exists("Cover_iTunes.png"):
    os.system("rm Cover_iTunes.png")
  if os.path.exists(DISCLAIMER_PATH):
    os.system("rm " + DISCLAIMER_PATH)

def make_ebook(options, root):
  if options.debug:
    clean_up()
  downloadToolsIfNeeded(pathToCommon)
  config = read_configuration_file()
  mandatoryFields = ["filename", "title", "author", "uuid", "date", "lang",
      "description", "publisher"]
  for field in mandatoryFields:
    if field not in config:
      print os.getcwd() + ": please specify a " + field
      sys.exit(1)
  print "* " + config["title"] + "..."
  if "skip" in config and not options.force:
    print "    (Skipping...)"
    return 2

  if options.debug:
    print "Copying common files..."
  copyCommonFiles(pathToCommon)

  title = config["title"]
  lang = config["lang"]
  date = config["date"]
  author = config["author"]
  author_parts = author.split(" ")
  author_sort_name = author_parts[-1] + " " + " ".join(author_parts[0:-1])
  file_name = config["filename"]
  if "subtitle" in config:
    subtitle = config["subtitle"]
  else:
    subtitle = ""
  if "description" in config:
    description = config["description"]
  else:
    description = ""
  itunes_vendor_id = "temporary_vendor_id"
  if "itunes_vendor_id" in config:
    itunes_vendor_id = config["itunes_vendor_id"]
  category = ""
  if "category" in config:
    category = config["category"]
  if "publisher" in config:
    publisher = config["publisher"]
  else:
    publisher = ""

  prepend_disclaimer(lang, publisher)
  htmlFiles = listHtmlFiles()
  imageFiles = listImageFiles()
  if needsBuilding(OutputType.COVER, options.force, htmlFiles, imageFiles,
      pathToCommon, pathToTemplates, config, itunes_vendor_id, options.debug):
    if options.debug:
      print "Rasterizing cover..."
    rasterizeCover(title, author, file_name, options.debug)
  elif os.path.exists("Cover_manual.png"):
    os.system("cp Cover_manual.png book/OEBPS/Images/Cover.png")
    os.system("mkthumb 2500 Cover_manual.png && " +\
        "mv Cover_manual_thumbnail.png Cover_iTunes.png")
  else:
    # No need to rasterize anything, just copy Cover.png over.
    os.system("cp Cover.png book/OEBPS/Images/")

  if needsBuilding(OutputType.EPUB, options.force, htmlFiles, imageFiles,
      pathToCommon, pathToTemplates, config, itunes_vendor_id, options.debug):
    if options.debug:
      print "Building epub..."

    appendLanguageDependentStyles(lang)
    appendLocalStyles()

    index = gather_index(htmlFiles)
    if options.debug:
      print "Gathering metadata..."
    metadata = preprocess_html(pathToCommon, htmlFiles, lang, options)
    if metadata.has_footnotes():
      generate_footnotes(metadata, htmlHeader, htmlFooter)
      htmlFiles.append(FOOTNOTES_HTML_FILE_NAME)
    imageFiles = removeUnusedImages(imageFiles, htmlFiles)
    generateContentOpf(config, imageFiles, htmlFiles, metadata.has_footnotes())
    generate_table_of_contents(metadata, config)
    generateTitlePage(config)
    generateEpub(file_name)
    checkEpub(pathToCommon, file_name)

  if needsBuilding(OutputType.ITUNES, options.force, htmlFiles, imageFiles,
      pathToCommon, pathToTemplates, config, itunes_vendor_id, options.debug):
    generate_itunes_producer_file(title, subtitle, author, author_sort_name,
        description, publisher, date, lang, file_name, itunes_vendor_id,
        category)

  if options.kindle and needsBuilding(OutputType.KINDLE, options.force,
      htmlFiles, imageFiles, pathToCommon, pathToTemplates, config, itunes_vendor_id,
      options.debug):
    generateMobi(pathToCommon, file_name)
    generate_kindle_cover()

  if not options.debug:
    clean_up()
  return 0
