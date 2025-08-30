@echo off
REM ===========================
REM PaulTheBest1000 Repo Lock Cleanup
REM ===========================

echo Closing any lingering Git locks...

REM Navigate to the repo folder (adjust if different)
cd /d "G:\Emergency VSC Stuff\PaulTheBest1000 YT Official Website\.git"

REM Delete index.lock and config.lock
if exist index.lock (
    echo Deleting index.lock...
    attrib -r -s -h index.lock
    del index.lock
)

if exist config.lock (
    echo Deleting config.lock...
    attrib -r -s -h config.lock
    del config.lock
)

REM Delete any remote branch locks
for %%f in (refs\remotes\origin\*.lock) do (
    echo Deleting %%f...
    attrib -r -s -h %%f
    del %%f
)

echo All ghost locks removed!
pause
