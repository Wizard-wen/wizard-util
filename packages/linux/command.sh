#
ps aux
ps -A
#
ps -ef | grep redis

kill -9 进程号

# 通过name获取pid
pgrep mongo # return pid
kill $pid
