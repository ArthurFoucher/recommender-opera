# Can't find a good plugin for hbs files so working on html 
# and renaming html to hbs every time the server is started
cd views/;
for p in *.html;
do 
	cp $p hbs/${p%.*}.hbs;
done;
cd ..; 
node ./server.js;