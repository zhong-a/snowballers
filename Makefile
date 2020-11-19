all:
	npm --prefix . run build
	surge --domain snowballers.surge.sh .
