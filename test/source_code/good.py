#!/usr/bin/env python

def main():
	n = int(raw_input())
	v = raw_input().split(' ')

	v = [int(i) for i in v]

	v = sorted(v)

	for i in v:
		print i,



main()
