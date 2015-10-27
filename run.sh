#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
cd $DIR;

subl $DIR;

if [ $1 = "kill" ]; then
	sudo killall grunt;
	exit;
fi


(`
sleep 3;
open http://yh-wonglok.127.0.0.1.xip.io:4000;
`&);


#jekyll serve --watch;



