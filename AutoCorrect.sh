#!/bin/bash
# #popclip
# name: AutoCorrect
# icon: square CJK
# title: {"en": "Formatting CJK", "zh-Hans": "格式化 CJK",}
# stdin: text
# after: paste-result
echo -n "$(/opt/homebrew/bin/autocorrect --stdin)"
