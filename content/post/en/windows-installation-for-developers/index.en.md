---
title: Windows installation TODO list for developers
date: 2022-07-04
image: cover.jpg
description: The nesessary steps all developers need to follow after installaing windows to make the system ready for development.
tags: [
  "Windows",
  "Developer",
  "Installation"
]
categories: [
  "Workstation"
]
---

## Fix Git "End Of Line" issue

The culprit is git, a configuration property of `core.autocrlf`

For historical reasons, the line breaks of the text file on windows and linux are different.

* Windows At the time of line break, carriage return is used at the same time `CR`(carriage-return character) and line breaks `LF`(linefeed character)
* Mac and Linux only use the newline character `LF`
* Old version of Mac uses carriage return `CR`
Therefore, there will be incompatibility problems when text files are created and used in different systems.

When I clone code on Windows, autocrlf is true as default and then each line of the file is automatically converted to `CRLF`. If you do not make any changes to the file, eslint delete `CR` by pre-commit since git automatically convert `CRLF` to `LF`.

So, after global configuration, you need to pull the code again.

```shell
git config --global core.autocrlf false
```

Done 🙂
