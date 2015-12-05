# FLL 2015/16 Trash Trek -- Scoring App

This is a scoring app for the First Lego League Trash Trek robot missions 
(2015-16 season).


## Use it!

To use, go to **[limeikle.github.io/fll-trash-trek-scoring/](http://limeikle.github.com/fll-trash-trek-scoring/)**

A PDF score sheet with the same questions and the same order can be found [here](score-sheet/).

Any comments, please let us know at **info@lambdajam.org** .  Good luck teams!


## Build it

This is written in node and generates a static website.
Once you've set up your environment (see below):

* To test it locally, run `grunt serve`. 
* To build, run `grunt build`. The output will be in `dist`.

The source for the PDF score sheet is an OmniGraffle file in the same folder.


## To setup 

This assumes you have `npm` and `bower` installed.
Once you've got them:

    npm install
    bower install

You should now be ready to `grunt`.


## To update the github web page

The github site (linked above) is made from the `gh-pages` branch.
The simplest way to set this up is:

    mkdir gh-pages   # this is already in .gitignore so git won't check it in
    cp -r .git gh-pages/
    cd gh-pages
    git pull
    git checkout gh-pages
    cd ..

Then whenever you want to update the website:

    grunt build
    cd gh-pages || exit
    rm -rf *
    cp -r ../dist/* .
    git add -A
    git commit -m 'update website with latest changes'
    git push
    cd ..

