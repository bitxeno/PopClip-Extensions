# My PopClip Extensions

## `build.sh` Usage

```
Create / Build / Remove the PopClip extension

Usage:
  ./build.sh <EXT_NAME>
  ./build.sh <OPTIONS> <EXT_NAME>
  ./build.sh -h

Options:
  -p  Create extension from `plist` template.
  -y  Create extension from `yaml` template.
  -j  Create extension from `json` template.
  -m  Create extension from `module` template (`Yaml` & `TypeScript`).
  -J  Create snippet extension from `JavaScript` snippet template.
  -T  Create snippet extension from `TypeScript` snippet template.
  -Y  Create snippet extension from `yaml` snippet template.
  -i  Build and install.
  -r  Remove extension and source!!!
  -h  Show help.
```

## Extensions Index

- [AIWhat](./dist/AIWhat.popclipextz)

> 询问 OpenAI 这是什么？灵感来自[iWhat](https://github.com/yihong0618/iWhat)。

- [OpenaiPolisher](./dist/OpenaiPolisher.popclipextz)

> 通过 OpenAI 进行文本润色，灵感来自来自[bob-plugin-openai-polisher](https://github.com/yetone/bob-plugin-openai-polisher)。

- [AutoSpacing](./dist/AutoSpacing.popclipextz)

  > 使用[pangu](https://github.com/vinta/pangu.js)为 CJK 语句自动添加空格

- [AutoCorrect](./dist/AutoCorrect.popclipextz)

  > 使用[autocorrect](https://github.com/huacnlee/autocorrect)格式化 CJK 语句

## References

- [PopClip Extensions][popext-website]
- [PopClip Extensions on GitHub][popext-github]
- [PopClip Extension Docs][docs]

[popext-website]: https://www.popclip.app/extensions/
[popext-github]: https://github.com/pilotmoon/PopClip-Extensions
[docs]: https://www.popclip.app/dev/

