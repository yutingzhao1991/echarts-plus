rm -rf _book
cp ../README.md _README.md
gitbook build
cd _book
cp -r ../../dist dist
cp -r ../../examples examples
git init
git add -A
git commit -m 'update book'
git push -f git@github.com:yutingzhao1991/echarts-plus.git master:gh-pages