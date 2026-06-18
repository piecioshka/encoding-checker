Output demo/encoding-checker.gif

Require encoding-checker

Set Shell "bash"
Set Framerate 60
Set FontSize 12
Set Width 800
Set Height 400
Set Padding 20
Set Margin 5
Set MarginFill "#212830"
Set BorderRadius 10

Hide
Type 'cd /tmp/encoding-checker-demo && clear' Enter
Show

Type "encoding-checker --help" Sleep 200ms Enter
Wait Sleep 1500ms

Enter Enter Type "# detect the character encoding of each matching file" Sleep 200ms Enter Enter
Wait Sleep 800ms

Type 'encoding-checker -p "*.txt" -v' Sleep 500ms Enter
Wait Sleep 2000ms

Sleep 3s
