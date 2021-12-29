
bin2c -d _manifestjson.h -o _manifestjson.c -n _manifestjson .\manifest.json
bin2c -d _favicon.h -o _favicon.c -n _favicon .\favicon.ico
bin2c -d _favicon16.h -o _favicon16.c -n _favicon16 .\favicon16.png
bin2c -d _favicon32.h -o _favicon32.c -n _favicon32 .\favicon32.png
bin2c -d _iospng.h -o _iospng.c -n _iospng .\ios.png
bin2c -d _android192png.h -o _android192png.c -n _android192png .\chrome192.png
bin2c -d _android256png.h -o _android256png.c -n _android256png .\chrome256.png

pause
