class Chapter:
  def __init__(self, filename, title, id):
    self.filename = filename
    self.title = title
    self.id = id
    self.subsections = []

  def __str__(self):
    return "<Chapter '" + self.title + "' in " + self.filename + \
        " with " + len(self.subsections) + " subsections>"

class Subsection:
  def __init__(self, title, id, level):
    self.title = title
    self.id = id
    self.level = level
    self.footnotes = []

  def __str__(self):
    return "<Subsection>"

class Footnote:
  def __init__(self, id, text):
    self.id = id
    self.text = text

  def __str__(self):
    return "<Footnote>"
