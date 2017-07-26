# 
# makelist.py
#
# Created by Samuel Lewi Hernandes on 7/26/2017.
# Copyright © 2017 Samuel Lewi Hernandes. All rights reserved.

import sys
make_list = []
file = open("semifinalis.txt",'a')
# file.write("Hello!")
for line in sys.stdin:
	make_list.append(line[0:-1:])
file.write('[\n\"\", //ignored\n')
for name in make_list[0:-1:]:
	file.write("\"" + name + "\",\n")
file.write("\"" + make_list[-1] + "\"\n];\n")
print(make_list)